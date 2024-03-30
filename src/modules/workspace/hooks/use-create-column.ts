import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { columnService } from '../../../shared/services/column.service';
import { ICreateColumnDto } from '../../../shared/services/dto/create.dto';

export function useCreateColumns() {
    const [error, setError] = useState<string | undefined>(undefined);
    const queryClient = useQueryClient();

    const { mutate: createColumn } = useMutation({
        mutationKey: ['create column'],
        mutationFn: ({ data }: { data: ICreateColumnDto }) => columnService.createColumn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['columns']
            });
        },
        onError: (error: any) => {
            setError(error?.response?.data?.message);
        }
    });
    return { createColumn };
}
