import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { projectService } from '../../../../../shared/services/project.service';
import { ICreateProjectDto } from '../../../../../shared/services/dto/create.dto';

export function useCreateProject() {
    const [error, setError] = useState<string | undefined>(undefined);
    const queryClient = useQueryClient();

    const { mutate: createProject } = useMutation({
        mutationKey: ['create project'],
        mutationFn: (data: ICreateProjectDto ) => projectService.createProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects']
            });
        },
        onError: (error: any) => {
            setError(error?.response?.data?.message);
        }
    });
    return { createProject };
}
