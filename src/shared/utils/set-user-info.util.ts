import { useAuth } from '../../store/auth';
import { useUser } from '../../store/user';
import { IUser } from '../types/user.types';

export const setUserInfo = (isAuth: boolean, user: IUser | null): void => {
	useAuth.getState().updateAuth(isAuth)();
	useUser.getState().setUser(user)();
};
