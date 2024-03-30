'use client'
import { useState } from 'react';
import { useQuery } from 'react-query';
import { workspaceService } from '../services/workspace.service';

export const useWorkspaces = () => {
    const [error, setError] = useState<string | undefined>(undefined);


    const { data, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: () => workspaceService.getWorkspaces(),
        onSuccess: (res) => {
        },
        onError: (error: any) => {
            setError(error?.response?.data?.message);
        }
    });

    return { error, setError, isLoading, workspacesList: data?.data };
};
