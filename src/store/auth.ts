import { create } from 'zustand';

interface IAuthState {
    isAuth: boolean | null;
    updateAuth: (value: boolean) => () => void;
}

export const useAuth = create<IAuthState>((set) => {
	return {
		isAuth: null,
		updateAuth: (value: boolean) => {
			return (): void => {
				set(() => {
					return {
						isAuth: value
					};
				});
			};
		}
	};
});
