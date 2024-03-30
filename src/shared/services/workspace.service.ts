import { ICreateWorkspaceDto } from './dto/create.dto';
import privateAxios from './privateAxios';

class WorkspaceService {
    public async getWorkspaces() {
        return privateAxios.get('/workspace');
    }

    public async createWorkspaces(body: ICreateWorkspaceDto) {
        return privateAxios.post('/workspace', body);
    }

    public async getWorkspaceById(id: number) {
        return privateAxios.get(`/workspace/${id}`);
    }
}

export const workspaceService = new WorkspaceService();
