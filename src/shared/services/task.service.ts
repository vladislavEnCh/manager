import { ITask } from '../types/task.types';
import { AssignTaskToAnotherProjectDto, ICreateTask } from './dto/create.dto';
import { IUpdateTaskDto } from './dto/update.dto';
import privateAxios from './privateAxios';

class TasksService {
    public async createTasks(data: ICreateTask) {
        return privateAxios.post(`/task`, data);
    }

    public async updateTasks(data: IUpdateTaskDto, taskId: number) {
        return privateAxios.put(`/task/${taskId}`, data);
    }

    public async getTasksByColumnId(id: number) {
        return privateAxios.get(`/task/columns/${id}`);
    }

    public async getTasksByProjectId(id: number) {
        return privateAxios.get(`/task/project/${id}`);
    }

    public async getTasks(id: number) {
        return privateAxios.get(`/task/${id}`);
    }

    public async getTask(id: number) {
        return privateAxios.get(`/task/task/${id}`);
    }

    public async updateTasksOrder(data: ITask[]) {
        return privateAxios.patch(`/task`, data);
    }

    public async updateStatusTasksOrder(data: ITask[]) {
        return privateAxios.patch(`/status-task`, data);
    }

    public async assignTaskToAnotherProject(data: AssignTaskToAnotherProjectDto) {
        return privateAxios.post(`/task/assign`, data);
    }
}

export const tasksService = new TasksService();
