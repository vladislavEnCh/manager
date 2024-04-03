import { useMutation, useQueryClient } from 'react-query';

import { IUpdateStatusTask } from '../../../shared/services/dto/update.dto';
import { statusService } from '../../../shared/services/status.service';
import { tasksService } from '../../../shared/services/task.service';
import { AssignTaskToAnotherProjectDto } from '../../../shared/services/dto/create.dto';

export function useAssignTask() {
    const queryClient = useQueryClient();
    const { mutate: assignTaskTask } = useMutation({
        mutationKey: ['assign task'],
        mutationFn: (data: AssignTaskToAnotherProjectDto) => tasksService.assignTaskToAnotherProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task']
            });
        },
        onError: (error: any) => {}
    });
    return { assignTaskTask };
}
