import { IUser } from "./user.types";

export interface ITask {
    createdAt: string;
    description: string;
    finalDate: string;
    id: number;
    column: {
        id: number;
        name: string;
    };
    name: string;
    position: number;
    priority: PriorityType;
    updatedAt: string;
    reporter: IUser;
}

export enum PriorityType {
    HIGHT = 'hight',
    MEDIUM = 'medium',
    LOW = 'low'
}
