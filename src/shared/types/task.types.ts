import { IStatusTask } from "./status-task.types";
import { IStatus } from "./status.types";
import { IUser } from "./user.types";

export interface ITask {
    createdAt: string;
    description: string;
    finalDate: string;
    id: number;
   
    name: string;
    position: number;
    priority: PriorityType;
    updatedAt: string;
    reporter: IUser;

    statusTask: IStatusTask[],

}

export enum PriorityType {
    HIGHT = 'hight',
    MEDIUM = 'medium',
    LOW = 'low'
}
