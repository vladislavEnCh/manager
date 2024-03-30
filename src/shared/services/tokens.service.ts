class TokensService {

    public getAccessToken = () => {
        return localStorage?.getItem('token');
    };

    public saveAccessToken = (token: string) => {
        return localStorage.setItem('token', token);
    };

    public removeAccessToken = () => {
        return localStorage.removeItem('token');
    };
}

export const tokensService = new TokensService();
