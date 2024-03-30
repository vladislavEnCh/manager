import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest, response: NextResponse) {
    const { url, cookies } = request;
    const refreshToken = cookies.get('refreshToken')?.value;

    const isLoginPage = url.includes('sign-in');
    const isRegisterPage = url.includes('sign-up');
    
    if ((isLoginPage || isRegisterPage) && refreshToken) {
        return NextResponse.redirect(new URL('dashboard', url));
    }
    if (isLoginPage || isRegisterPage) return NextResponse.next();

    if (!refreshToken) return NextResponse.redirect(new URL('sign-in', url));

    return NextResponse.next();
}

export const config = {
    matcher: ['/sign-in/:path*', '/dashboard/:path*', '/workspace/:path*']
};
