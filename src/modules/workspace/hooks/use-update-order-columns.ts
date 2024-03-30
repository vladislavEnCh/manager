import { useMutation, useQueryClient } from 'react-query';

import { columnService } from '../../../shared/services/column.service';

export function useUpdateOrderColumns() {
    const queryClient = useQueryClient();
    const { mutate: updateColumns } = useMutation({
        mutationKey: ['update columns order'],
        mutationFn: ({ data }: any) => {
            return columnService.updateColumnsOrder(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['columns']
            });
        },
        onError: (error: any) => {
            //setError(error?.response?.data?.message);
        }
    });
    return { updateOrderColumn: updateColumns };
}
