import { IProject } from "./project.types";
import { IStatus } from "./status.types";
import { ITask } from "./task.types";

export interface IStatusTask {
    id: number;
	name: string;
	position: number;
	task: ITask;
	status: IStatus;
	projects: IProject[]
}
