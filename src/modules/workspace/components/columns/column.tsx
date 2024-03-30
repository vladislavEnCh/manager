import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import React, { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { ITask } from '../../../../shared/types/task.types';
import { useColumnDebounce } from '../../hooks/use-column-debounce';
import { useCreateTask } from '../../hooks/use-create-task';
import TaskCard from '../task-card';
import AddTaskCard from '../task-card/add-task-card';

type IColumn = {
    name: string;
    id: number;
    workspaceId: number;
    tasks: ITask[];
};

const Column: FC<IColumn> = ({ name, id, workspaceId, tasks }) => {
    const { register, control, watch } = useForm({
        defaultValues: {
            name
        }
    });

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id,
        data: {
            type: 'Column',
            data: { name, id }
        }
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    useColumnDebounce({
        watch,
        columnId: id
    });

    const { createTask } = useCreateTask();

    const taskId: any = useMemo(() => tasks?.map((task: ITask) => `${task.id}a`), [tasks]);

    if (isDragging) {
        return (
            //<div style={style} ref={setNodeRef} className='h-screen w-[2px] bg-gray-600'/>
            <div
                ref={setNodeRef}
                style={style}
                className='border bg-slate-200 opacity-50 w-[350px] h-screen'
            />
        );
    }

    const createTaskHandler = () => {
        createTask({
            data: {
                workspaceId,
                columnId: id
            }
        });
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className=' pb-2 rounded-3xl w-[350px] h-full p-4 overflow-y-auto  border-stone-300'
        >
            <div className='flex justify-between mb-10'>
                    <input
                        {...register('name')}
                        id={name}
                        className={` bg-transparent border-none text-2xl rounded px-3 py-2 focus:outline-none focus:bg-white `}
                    />
                <DragIndicatorIcon
                    color='inherit'
                    className='text-neutral-500  cursor-pointer'
                    fontSize='small'
                    {...attributes}
                    {...listeners}
                />
            </div>
            <AddTaskCard onClick={createTaskHandler} />
            <SortableContext items={taskId}>
                <div className='flex flex-col gap-4 '>
                    {tasks?.map((task: ITask) => {
                        return (
                            <TaskCard
                                key={task.id}
                                task={task}
                            />
                        );
                    })}
                </div>
            </SortableContext>
        </div>
    );
};

export default Column;
