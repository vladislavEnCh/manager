import { useState } from 'react';
import { useQuery } from 'react-query';

import { tasksService } from '../../../shared/services/task.service';
import { ITask } from '../../../shared/types/task.types';

export function useGetTask(id: number) {
    const [error, setError] = useState<string | undefined>(undefined);
    const [task, setTask] = useState<ITask>();
    
    const { isLoading } = useQuery<any, ITask>({
        queryKey: ['task', id],
        enabled: !!id,
        queryFn: () => tasksService.getTask(id),
        onSuccess: (res) => {
            setTask(res?.data);
        },
        onError: (error: any) => {
            setError(error?.response?.data?.message);
        }
    });
    return { error, setError, isLoading, task };
}
