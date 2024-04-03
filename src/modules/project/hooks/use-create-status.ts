import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { columnService } from '../../../shared/services/column.service';
import { ICreateColumnDto } from '../../../shared/services/dto/create.dto';
import { statusService } from '../../../shared/services/status.service';

export function useCreateStatus() {
    const [error, setError] = useState<string | undefined>(undefined);
    const queryClient = useQueryClient();

    const { mutate: createStatus } = useMutation({
        mutationKey: ['create status'],
        mutationFn: ({ data }: { data: ICreateColumnDto }) => statusService.createStatus(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['statuses']
            });
        },
        onError: (error: any) => {
            setError(error?.response?.data?.message);
        }
    });
    return { createStatus };
}
