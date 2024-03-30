import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { columnService } from '../../../shared/services/column.service';
import { ICreateColumnDto } from '../../../shared/services/dto/create.dto';
import { IUpdateColumnDto } from '../../../shared/services/dto/update.dto';

export function useUpdateColumns() {
    const queryClient = useQueryClient();
    const { mutate: updateColumn } = useMutation({
        mutationKey: ['update column'],
        mutationFn: (data: IUpdateColumnDto) => columnService.updateColumn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['columns']
            });
        },
        onError: (error: any) => {}
    });
    return { updateColumn };
}
