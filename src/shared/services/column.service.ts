import { IColumn } from '../types/columns.types';
import { ICreateColumnDto, ICreateWorkspaceDto } from './dto/create.dto';
import { IUpdateColumnDto } from './dto/update.dto';
import privateAxios from './privateAxios';

class ColumnService {
    public async getColumns(workspaceId: number) {
        return privateAxios.get(`/column/${workspaceId}`);
    }

    public async updateColumn(data: IUpdateColumnDto) {
        return privateAxios.put(`/column/${data.columnId}`, {
            name: data.name
        });
    }

    public async createColumn(data: ICreateColumnDto) {
        return privateAxios.post(`/column`, data);
    }

	public async updateColumnsOrder(data: IColumn[]) {
        return privateAxios.patch(`/column`, data);
    }
}

export const columnService = new ColumnService();
