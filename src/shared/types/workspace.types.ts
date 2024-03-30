import { IUser } from "./user.types";

export interface IWorkspace {
	id: number;
	name: string;
	users: IUser[];
	type: WorkspaceType;
	tasks: any[];
	createdAt: Date;
	updatedAt: Date;
  }

  export enum WorkspaceType {
	KANBAN = 'kanban',
	SPRINT = 'sprint',
  }