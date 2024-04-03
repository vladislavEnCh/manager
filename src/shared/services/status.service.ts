import { IColumn } from '../types/columns.types';
import { IStatus } from '../types/status.types';
import { ICreateColumnDto, ICreateStatusDto, ICreateWorkspaceDto } from './dto/create.dto';
import { IUpdateColumnDto, IUpdateStatusDto, IUpdateStatusTask } from './dto/update.dto';
import privateAxios from './privateAxios';

class StatusService {
    public async getColumns(projectId: number) {
        return privateAxios.get(`/status/${projectId}`);
    }

    public async updateStatus(data: IUpdateStatusDto) {
        return privateAxios.put(`/status/${data.statusId}`, {
            name: data.name
        });
    }

    public async createStatus(data: ICreateStatusDto) {
        return privateAxios.post(`/status`, data);
    }

    public async updateStatusesOrder(data: IStatus[]) {
        return privateAxios.patch(`/status`, data);
    }

    public async updateStatusTask(data: IUpdateStatusTask) {
        return privateAxios.put(`/status-task/${data.statusTaskId}`, {
            newStatusId: data.newStatusId
        });
    }
}

export const statusService = new StatusService();
