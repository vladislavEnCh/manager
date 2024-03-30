import { useState } from 'react';
import { useQuery } from 'react-query';

import { tasksService } from '../../../shared/services/task.service';
import { ITask } from '../../../shared/types/task.types';

export function useGetTasks(id: number) {
    const [error, setError] = useState<string | undefined>(undefined);
    const [tasksList, setTasksList] = useState<ITask[]>([]);

    const { isLoading } = useQuery<any, ITask>({
        queryKey: ['tasks'],
        queryFn: () => tasksService.getTasks(id),
        onSuccess: (res) => {
            setTasksList(res?.data);
        },
        onError: (error: any) => {
            setError(error?.response?.data?.message);
        }
    });
    return { error, setError, isLoading, tasksList, setTasksList };
}
