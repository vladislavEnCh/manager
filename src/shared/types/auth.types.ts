export interface ISignInBody {
    email: string;
    password: string;
}


export interface ISignInResponseBody {
    email: string;
    id: string;
	accessToken: string;
}
