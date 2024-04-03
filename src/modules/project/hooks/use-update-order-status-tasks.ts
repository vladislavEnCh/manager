import { useMutation, useQueryClient } from 'react-query';

import { tasksService } from '../../../shared/services/task.service';

export function useUpdateOrderStatusTasks() {
    const queryClient = useQueryClient();
    const { mutate: updateTasks, isLoading } = useMutation({
        mutationKey: ['update status tasks order'],
        mutationFn: ({ data }: any) => {
            return tasksService.updateStatusTasksOrder(data);
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
