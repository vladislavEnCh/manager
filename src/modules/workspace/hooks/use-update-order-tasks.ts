import { useMutation, useQueryClient } from 'react-query';

import { tasksService } from '../../../shared/services/task.service';

export function useUpdateOrderTasks() {
    const queryClient = useQueryClient();
    const { mutate: updateTasks, isLoading } = useMutation({
        mutationKey: ['update tasks order'],
        mutationFn: ({ data }: any) => {
            return tasksService.updateTasksOrder(data);
        },
        onSuccess: () => {
            //queryClient.invalidateQueries({
            //    queryKey: ['tasks']
            //});
        },
        onError: (error: any) => {
            //setError(error?.response?.data?.message);
        }
    });
    return { updateOrderTasks: updateTasks, isLoading };
}
