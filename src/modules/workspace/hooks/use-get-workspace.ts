import { useState } from 'react';
import { useQuery } from 'react-query';

import { workspaceService } from '../../../shared/services/workspace.service';
import { IWorkspace } from '../../../shared/types/workspace.types';

export function useGetWorkspace(id: number) {
    const [error, setError] = useState<string | undefined>(undefined);
    const [workspace, setWorkspace] = useState<IWorkspace>();

    const { isLoading } = useQuery<any, IWorkspace>({
        queryKey: ['workspace', id],
        enabled: !!id,
        queryFn: () => workspaceService.getWorkspaceById(id),
        onSuccess: (res) => {
            setWorkspace(res?.data);
        },
        onError: (error: any) => {
            setError(error?.response?.data?.message);
        }
    });
    return { error, setError, isLoading, workspace };
}
