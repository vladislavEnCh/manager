import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { columnService } from '../../../shared/services/column.service';
import { ICreateColumnDto, ICreateTask } from '../../../shared/services/dto/create.dto';
import { tasksService } from '../../../shared/services/task.service';

export function useCreateTask() {
    const [error, setError] = useState<string | undefined>(undefined);
    const queryClient = useQueryClient();

    const { mutate: createTask } = useMutation({
        mutationKey: ['create task'],
        mutationFn: ({ data }: { data: ICreateTask }) => tasksService.createTasks(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            });
        },
        onError: (error: any) => {
            setError(error?.response?.data?.message);
        }
    });
    return { createTask };
}
