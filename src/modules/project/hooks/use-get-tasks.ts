import { useState } from 'react';
import { useQuery } from 'react-query';

import { tasksService } from '../../../shared/services/task.service';
import { ITask } from '../../../shared/types/task.types';
import { IStatusTask } from '../../../shared/types/status-task.types';

export function useGetTasksByProject(id: number) {
    const [error, setError] = useState<string | undefined>(undefined);
    const [tasksList, setTasksList] = useState<IStatusTask[]>([]);

    const { isLoading } = useQuery<any, IStatusTask>({
        queryKey: ['tasks'],
        queryFn: () => tasksService.getTasksByProjectId(id),
        onSuccess: (res) => {
            setTasksList(res?.data);
        },
        onError: (error: any) => {
            setError(error?.response?.data?.message);
        }
    });
    return { error, setError, isLoading, tasksList, setTasksList };
}
