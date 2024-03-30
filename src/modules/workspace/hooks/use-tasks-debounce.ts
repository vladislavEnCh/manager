import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';

import { useUpdateTask } from './use-update-task';

export function useTasksDebounce({ watch, taskId }: { watch: UseFormWatch<any>; taskId: number }) {
    const { updateTask } = useUpdateTask();

    const debounceUpdateTask = useCallback(
        debounce((state: any) => {
            console.log(state)
            updateTask(state);
        }, 1000),
        []
    );

    useEffect(() => {
        const { unsubscribe } = watch((formData) => {
            debounceUpdateTask({
                data: formData,
                taskId
            });
        });
        return () => {
            unsubscribe();
        };
    }, [watch(), debounceUpdateTask]);
}
