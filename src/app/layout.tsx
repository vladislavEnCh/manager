import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import { Toaster } from 'sonner';

import './globals.css';
import { Providers } from './providers';

const zen = Noto_Sans({
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-zen',
    subsets:['latin'],
    style: ['normal']
});

export const metadata: Metadata = {
    title: 'Manager Enterprise',
    description: 'Best for planning'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={zen.className}>
                <Providers>
                    <Toaster
                        theme='dark'
                        position='bottom-right'
                        duration={2000}
                    />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
