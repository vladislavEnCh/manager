import { useMutation, useQueryClient } from 'react-query';

import { tasksService } from '../../../shared/services/task.service';
import { IUpdateTaskDto } from '../../../shared/services/dto/update.dto';

export function useUpdateTask(onFinal?: any) {
    const queryClient = useQueryClient();
    const { mutate: updateTask } = useMutation({
        mutationKey: ['update column'],
        mutationFn: ({ data, taskId }: { data: IUpdateTaskDto; taskId: number }) =>
            tasksService.updateTasks(data, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks'],
                //queryKey: ['task', taskId],
            });
            onFinal?.()
        },
        onError: (error: any) => {}
    });
    return { updateTask };
}
