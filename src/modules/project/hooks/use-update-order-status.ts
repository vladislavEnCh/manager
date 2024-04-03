import { useMutation, useQueryClient } from 'react-query';

import { columnService } from '../../../shared/services/column.service';
import { statusService } from '../../../shared/services/status.service';

export function useUpdateOrderStatuses() {
    const queryClient = useQueryClient();
    const { mutate: updateStatuses } = useMutation({
        mutationKey: ['update statuses order'],
        mutationFn: ({ data }: any) => {
            return statusService.updateStatusesOrder(data);
        },
        onSuccess: () => {
            //queryClient.invalidateQueries({
            //    queryKey: ['statuses']
            //});
        },
        onError: (error: any) => {
            //setError(error?.response?.data?.message);
        }
    });
    return { updateOrderStatuses: updateStatuses };
}
