import axios from 'axios';

import { authService } from './auth.service';
import { tokensService } from './tokens.service';

const privateAxios = axios.create({
    baseURL: 'http://localhost:5003/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

privateAxios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${tokensService.getAccessToken()}`;
    return config;
});

privateAxios.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originRequest = error.config;

        if (error?.response?.status == 401 && error.config && !error.config._isRetry) {
            originRequest._isRetry = true;

            try {
                await authService.getNewToken();
                console.log(' get new token');
                return privateAxios.request(originRequest);
            } catch (error: any) {
                if (error?.response?.status == 401) {
                    tokensService.removeAccessToken();
                    return await authService.logout();
                }
            }
        }
    }
);

export default privateAxios;
