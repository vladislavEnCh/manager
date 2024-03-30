import { PriorityType } from "../../types/task.types";

export interface IUpdateColumnDto {
    name: string;
    columnId: number;
}

export interface IUpdateTaskDto {
    name?: string;
    columnId?: number;
    finalDate? :string;
    description? :string;
    priority? :PriorityType;
}