import { useState } from 'react';
import { useQuery } from 'react-query';

import { statusService } from '../../../shared/services/status.service';
import { IStatus } from '../../../shared/types/status.types';

export function useGetStatuses(id: number) {
    const [error, setError] = useState<string | undefined>(undefined);
    const [statusList, setStatusList] = useState<IStatus[]>([]);

    const { data, isLoading } = useQuery<any, IStatus>({
        queryKey: ['statuses'],
        keepPreviousData: true,
        queryFn: () => statusService.getColumns(id),
        onSuccess: (res) => {
            //console.log(res.data);
            setStatusList(res.data);
        },
        onError: (error: any) => {
            setError(error?.response?.data?.message);
        }
    });
    return { error, setError, isLoading, statusList, setStatusList };
}
