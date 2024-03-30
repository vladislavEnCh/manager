import { AxiosResponse } from 'axios';

import { ISignInBody, ISignInResponseBody } from '../types/auth.types';
import privateAxios from './privateAxios';
import { publicAxios } from './publicAxios';
import { tokensService } from './tokens.service';

class AuthService {
    public async signIn(body: ISignInBody) {
        return publicAxios.post<ISignInBody, AxiosResponse<ISignInResponseBody>>(
            '/auth/login',
            body
        );
    }

    public async authCheck() {
        return privateAxios.get('/auth/profile');
    }

    public async logout() {
        return privateAxios.post('/auth/logout');
    }

    public async getNewToken() {
        const res: any = await privateAxios.post('/auth/access-token');
        console.log('got new token', res);
        if (res.data.accessToken) tokensService.saveAccessToken(res.data.accessToken);

        return res;
    }
}

export const authService = new AuthService();
