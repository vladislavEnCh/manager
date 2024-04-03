import { useState } from 'react';
import { useQuery } from 'react-query';

import { columnService } from '../../../shared/services/column.service';
import { IColumn } from '../../../shared/types/columns.types';

export function useGetColumns(id: number) {
    const [error, setError] = useState<string | undefined>(undefined);
	const [columnsList, setColumnsList] = useState<IColumn[]>([])

    const { data, isLoading } = useQuery<any, IColumn>({
        queryKey: ['columns'],
        keepPreviousData: true,
        queryFn: () => columnService.getColumns(id),
        onSuccess: (res) => {
            //console.log(res.data)
			setColumnsList(res.data)
        },
        onError: (error: any) => {
            setError(error?.response?.data?.message);
        }
    });
    return { error, setError, isLoading, columnsList, setColumnsList };
}
