import { create } from 'zustand';

import { IUser } from '../shared/types/user.types';

interface ISideTaskState {
    isOpenSideTask: boolean;
    taskId: number | null;
    setIsOpenSideTask: (value: boolean) => void;
    setSideTaskId: (taskId: number | null) => () => void;
}

export const useSideTask = create<ISideTaskState>((set: any) => {
    return {
        isOpenSideTask: false,
        taskId: null,
        setSideTaskId: (taskId: number) => set(() => ({ taskId })),
        setIsOpenSideTask: (value: boolean) => set(() => ({ isOpenSideTask: value }))
    };
});
