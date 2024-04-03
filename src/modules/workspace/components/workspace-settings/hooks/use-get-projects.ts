import { useState } from 'react';
import { useQuery } from 'react-query';

import { projectService } from '../../../../../shared/services/project.service';
import { IProject } from '../../../../../shared/types/project.types';
import { ITask } from '../../../../../shared/types/task.types';

export function useGetProject(id: number, task?: ITask) {
    const [error, setError] = useState<string | undefined>(undefined);
    const [projects, setProjects] = useState<IProject[]>([]);
    const [projectsWithoutCurrent, setProjectsWithoutCurrent] = useState<IProject[]>([]);

    const { isLoading } = useQuery<any, IProject>({
        queryKey: ['projects', id],
        enabled: !!id,
        queryFn: () => projectService.getProjects(id),
        onSuccess: (res) => {
            setProjects(res?.data);
            if (task) {
                task.statusTask;
                const projectIds: any = [];
                task.statusTask.forEach((statusTask) => {
                    projectIds.push(statusTask.projects[0].id);
                });
                setProjectsWithoutCurrent(
                    res.data?.filter((item: IProject) => {
                        return !projectIds.some((item2: number) => item2 === item.id);
                    })
                );
            }
        },
        onError: (error: any) => {
            setError(error?.response?.data?.message);
        }
    });
    return { error, setError, isLoading, projects, projectsWithoutCurrent };
}
