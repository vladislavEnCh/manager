import { useEffect } from 'react';
import { authService } from '../services/auth.service';
import { setUserInfo } from '../utils/set-user-info.util';

export const useAuthCheck = (): void => {
    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const res = await authService.authCheck();
                setUserInfo(true, {
                    email: res.data.email,
                    id: res.data.id
                });
            } catch (error) {
                setUserInfo(false, null);
            }
        })();
    }, []);
};
