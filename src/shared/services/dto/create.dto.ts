import { PriorityType } from '../../types/task.types';

export interface ICreateWorkspaceDto {
    name: string;
}

export interface ICreateColumnDto {
    name: string;
    project_id: number;
}

export interface ICreateStatusDto {
    name: string;
    project_id: number;
}

export interface ICreateProjectDto {
    name: string;
    workspace_id: number;
}

export interface ICreateTask {
    name?: string;

    projectId: number;

    statusId: number;

    description?: string;

    priority?: PriorityType;

    assigneeId?: string;

    finalDate?: string;
}

export interface AssignTaskToAnotherProjectDto {
    taskId: number;
  
    projectId: number;
  }

export interface IUpdateTask extends ICreateTask {}
