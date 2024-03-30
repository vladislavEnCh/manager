'use client';

import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    useSensors
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { IColumn } from '../../shared/types/columns.types';
import { ITask } from '../../shared/types/task.types';
import { useSideTask } from '../../store/side-task';
import AddColumn from './components/columns/add-column';
import Column from './components/columns/column';
import TaskCard from './components/task-card';
import { useCreateColumns } from './hooks/use-create-column';
import { useGetColumns } from './hooks/use-get-columns';
import { useGetTasks } from './hooks/use-get-tasks';
import { useUpdateOrderColumns } from './hooks/use-update-order-columns';
import { useUpdateOrderTasks } from './hooks/use-update-order-tasks';

const WorkspaceView = () => {
    const params = useParams();

    const searchParams = useSearchParams();

    const search = searchParams.get('task');

    const { setIsOpenSideTask, setSideTaskId } = useSideTask();

    useEffect(() => {
        setSideTaskId(Number(search));
        if (search) setIsOpenSideTask(true);
    }, [search]);

    const { columnsList, isLoading, setColumnsList } = useGetColumns(Number(params.workspace));
    const { createColumn } = useCreateColumns();
    const { tasksList, setTasksList } = useGetTasks(Number(params.workspace));

    const { updateOrderColumn } = useUpdateOrderColumns();
    const { updateOrderTasks, isLoading: updateLoading } = useUpdateOrderTasks();

    const columnsId = useMemo(() => columnsList?.map((col: IColumn) => col.id), [columnsList]);

    const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);

    const [activeTask, setActiveTask] = useState<ITask | null>(null);

    const sensors = useSensors();

    const createColumnHandler = () => {
        createColumn({
            data: {
                name: 'Columns',
                workspace_id: Number(params.workspace)
            }
        });
    };

    const onDragStartHandler = (event: DragStartEvent) => {
        if (event.active?.data?.current?.type == 'Column') {
            setActiveColumn(event.active?.data?.current?.data);
            return;
        }

        if (event.active?.data?.current?.type == 'Task') {
            null;
            setActiveTask(event.active?.data?.current?.data);
            return;
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveColumn(null);
        setActiveTask(null);
        const { active, over } = event;
        if (active.data.current?.type !== 'Column') return;
        if (!over) return;

        const activeId = active?.id;
        const overId = over.id;

        if (activeId === overId) return;
        if (active.data.current?.type == 'Column') {
            setColumnsList((columns: any) => {
                const activeColumnIndex = columns.findIndex((col: IColumn) => col.id === activeId);

                const overColumnIndex = columns.findIndex((col: IColumn) => col.id === overId);
                const order: any = arrayMove(columns, activeColumnIndex, overColumnIndex);
                updateOrderColumn({ data: order });
                return order;
            });
        }
    };
    const updateTasksAsync = async (data: any) => {
        await updateOrderTasks({ data });
    };

    const onDragOverHandler = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;
        const activeId = active?.id;
        const overId = over.id;
        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === 'Task';
        const isOverTask = over.data.current?.type === 'Task';

        const isOverColumn = over.data.current?.type === 'Column';
        if (isOverColumn) {
            setTasksList((tasks: ITask[]) => {
                const activeIndex = tasks.findIndex((task: IColumn) => `${task.id}a` === activeId);
                tasks[activeIndex].column.id = over.data.current?.data?.id;
                const order = arrayMove(tasks, activeIndex, over.data.current?.data?.id);
                updateOrderTasks({ data: order });
                return order;
            });
        }

        if (isActiveTask && isOverTask) {
            setTasksList((tasks: ITask[]) => {
                const activeIndex = tasks.findIndex((task: IColumn) => `${task.id}a` === activeId);
                const overIndex = tasks.findIndex((task: IColumn) => `${task.id}a` === overId);

                if (tasks[activeIndex].column.id !== tasks[overIndex].column.id) {
                    tasks[activeIndex].column.id = tasks[overIndex].column.id;
                }
                const order = arrayMove(tasks, activeIndex, overIndex);
                updateOrderTasks({ data: order });
                return order;
            });
        }
    };

    return (
        <div className='w-full flex h-[calc(100vh-195px)] overflow-x-scroll overflow-y-hidden'>
            <DndContext
                onDragStart={onDragStartHandler}
                onDragEnd={handleDragEnd}
                onDragMove={onDragOverHandler}
                //onDragOver={onDragOverHandler}
            >
                <div className='p-8 flex flex-row gap-6'>
                    <SortableContext items={columnsId}>
                        {columnsList?.map((item: IColumn) => {
                            return (
                                <Column
                                    key={item.id}
                                    name={item.name}
                                    id={item.id}
                                    workspaceId={Number(params.workspace)}
                                    tasks={tasksList?.filter(
                                        (task: ITask) => task.column?.id == item.id
                                    )}
                                />
                            );
                        })}
                    </SortableContext>
                    <AddColumn onClick={createColumnHandler} />
                </div>
                {createPortal(
                    <DragOverlay>
                        {activeColumn ? (
                            <Column
                                key={'key'}
                                name={activeColumn.name}
                                id={activeColumn.id}
                                workspaceId={Number(params.workspace)}
                                tasks={tasksList?.filter(
                                    (task: ITask) => task.column?.id == activeColumn.id
                                )}
                            />
                        ) : (
                            <></>
                        )}
                        {activeTask ? (
                            <TaskCard
                                key={'key'}
                                task={activeTask}
                            />
                        ) : (
                            <></>
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
};

export default WorkspaceView;
