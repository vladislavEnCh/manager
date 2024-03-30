'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { authService } from '../../shared/services/auth.service';
import { tokensService } from '../../shared/services/tokens.service';
import { setUserInfo } from '../../shared/utils/set-user-info.util';
import OpenTaskView from '../../modules/open-task';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { push } = useRouter();

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const res = await authService.authCheck();
                setUserInfo(true, {
                    email: res.data.email,
                    id: res.data.id
                });
            } catch (error) {
                console.log('layour profile error', error);
                logoutHandler();
            }
        })();
    }, []);

    const logoutHandler = (): void => {
        authService.logout();
        tokensService.removeAccessToken();
        setUserInfo(false, null);
        push('/sign-in');
    };
    

    return (
        <div className=' w-full  relative'>
          <OpenTaskView />

            <div className='w-full mr-20 flex bg-[#5021FF] px-4 py-6 '>
                <div className='hover:bg-blue-700 p-4 rounded'>
                    <Link
                        href={'/dashboard'}
                        className='text-white text-xl font-medium'
                    >
                        Dashboard
                    </Link>
                </div>
                {/*{location?.pathname.includes('workspace') ? (
			<div className='bg-blue-700 w-full rounded px-8 py-3 flex gap-4 flex-col'>
				<p className='text-white text-2xl font-medium mb-4 text-center'>Workspace</p>
				<Link
					href={'/calendar'}
					className='text-white text-xl font-medium flex gap-2'
				>
					<FormatListBulletedIcon />
					Tasks
				</Link>
				<Link
					href={'/calendar'}
					className='text-white text-xl font-medium flex gap-2'
				>
					<DashboardIcon />
					Board
				</Link>
			</div>
		) : (
			<></>
		)}*/}
                <div className='hover:bg-blue-700 p-4 rounded'>
                    <Link
                        href={'/calendar'}
                        className='text-white text-xl font-medium'
                    >
                        Calendar
                    </Link>
                </div>

                <button
                    onClick={logoutHandler}
                    className='hover:bg-blue-700 p-4 rounded'
                >
                    <p className='text-white text-xl font-medium'>Logout</p>
                </button>
            </div>
            <div className='rounded w-full bg-slate-100 overflow-hidden'>{children}</div>
        </div>
    );
}
