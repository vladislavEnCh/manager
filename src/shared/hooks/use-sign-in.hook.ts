import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISignInBody } from '../types/auth.types';
import { authService } from '../services/auth.service';
import { RouterKeys } from '../../router/keys';
import { setUserInfo } from '../utils/set-user-info.util';

export const useSignIn = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit = async (body: ISignInBody): Promise<void> => {
        setIsLoading(true);
        try {
            const res = await authService.signIn(body);
            localStorage.setItem('token', res.data.accessToken);
            setUserInfo(true, {
                email: res.data.email,
                id: res.data.id
            });
            navigate(`/${RouterKeys.HOME}`);
        } catch (e: any) {
            setError(e?.response?.data?.message);
        }
        setIsLoading(false);
    };

    return { error, setError, onSubmit, isLoading };
};
