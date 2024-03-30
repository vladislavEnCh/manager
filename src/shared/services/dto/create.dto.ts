import { PriorityType } from '../../types/task.types';

export interface ICreateWorkspaceDto {
    name: string;
}

export interface ICreateColumnDto {
    name: string;
    workspace_id: number;
}

export interface ICreateTask {
    name?: string;

    workspaceId: number;

    columnId?: number;

    description?: string;

    priority?: PriorityType;

    assigneeId?: string;

    finalDate?: string;
}

export interface IUpdateTask extends ICreateTask {}
