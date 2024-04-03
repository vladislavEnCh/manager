import { useMutation, useQueryClient } from 'react-query';

import { IUpdateStatusTask } from '../../../shared/services/dto/update.dto';
import { statusService } from '../../../shared/services/status.service';

export function useUpdateStatusTask() {
    const queryClient = useQueryClient();
    const { mutate: updateStatusTask } = useMutation({
        mutationKey: ['update statusTask'],
        mutationFn: (data: IUpdateStatusTask) => statusService.updateStatusTask(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            });
        },
        onError: (error: any) => {}
    });
    return { updateStatusTask };
}
