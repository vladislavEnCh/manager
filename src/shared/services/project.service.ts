import { IColumn } from '../types/columns.types';
import { ICreateColumnDto, ICreateProjectDto, ICreateWorkspaceDto } from './dto/create.dto';
import { IUpdateColumnDto } from './dto/update.dto';
import privateAxios from './privateAxios';

class ProjectService {
    public async getProjects(workspaceId: number) {
        return privateAxios.get(`/project/${workspaceId}`);
    }
    public async createProject(data: ICreateProjectDto) {
        return privateAxios.post(`/project`, data);
    }
}

export const projectService = new ProjectService();
