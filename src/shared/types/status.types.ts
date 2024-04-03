import { IStatusTask } from "./status-task.types";

export interface IStatus {
    id: number;
	name: string;
	statusTask: IStatusTask[];
	position: number;
}
