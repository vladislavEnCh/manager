import { create } from 'zustand';
import { IUser } from '../shared/types/user.types';

interface IUserState {
    user: IUser | null;
    setUser: (value: IUser | null) => () => void;
}

export const useUser = create<IUserState>((set) => {
	return {
		user: null,
		setUser: (value: IUser | null) => {
			return (): void => {
				set(() => {
					return {
						user: value
					};
				});
			};
		}
	};
});
