'use client';

import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { IColumn } from '../../shared/types/columns.types';
import { IStatusTask } from '../../shared/types/status-task.types';
import { IStatus } from '../../shared/types/status.types';
import { useSideTask } from '../../store/side-task';
import AddColumn from '../workspace/components/columns/add-column';
import Column from '../workspace/components/columns/column';
import { useGetStatuses } from './hooks/use-get-statuses';
import { useGetTasksByProject } from './hooks/use-get-tasks';
import { useUpdateOrderStatuses } from './hooks/use-update-order-status';
import { useUpdateOrderStatusTasks } from './hooks/use-update-order-status-tasks';
import TaskCard from '../workspace/components/task-card';
import { useCreateStatus } from './hooks/use-create-status';

const ProjectView = () => {
    const params = useParams();

    const searchParams = useSearchParams();

    const search = searchParams.get('task');

    const { setIsOpenSideTask, setSideTaskId } = useSideTask();

    useEffect(() => {
        setSideTaskId(Number(search));
        if (search) setIsOpenSideTask(true);
    }, [search]);


    const { statusList, setStatusList, isLoading } = useGetStatuses(Number(params.project));

    const { createStatus } = useCreateStatus();
    const { tasksList, setTasksList } = useGetTasksByProject(Number(params.project));

    const { updateOrderStatuses } = useUpdateOrderStatuses();
    const { updateOrderTasks, isLoading: updateLoading } = useUpdateOrderStatusTasks();

    const columnsId = useMemo(() => statusList?.map((col: IColumn) => col.id), [statusList]);

    const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);

    const [activeTask, setActiveTask] = useState<IStatusTask | null>(null);


    const createColumnHandler = () => {
        createStatus({
            data: {
                name: 'Status',
                project_id: Number(params.project)
            }
        });
    };

    const onDragStartHandler = (event: DragStartEvent) => {
        if (event.active?.data?.current?.type == 'Status') {
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
        if (active.data.current?.type !== 'Status') return;
        if (!over) return;

        const activeId = active?.id;
        const overId = over.id;

        if (activeId === overId) return;
        if (active.data.current?.type == 'Status') {
            setStatusList((statuses: any) => {
                const activeStatusIndex = statuses.findIndex(
                    (status: IStatus) => status.id === activeId
                );

                const overStatusIndex = statuses.findIndex(
                    (status: IStatus) => status.id === overId
                );
                const order: any = arrayMove(statuses, activeStatusIndex, overStatusIndex);
                updateOrderStatuses({ data: order });
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

        const isOverColumn = over.data.current?.type === 'Status';
        if (isOverColumn && isActiveTask) {
            setTasksList((statusTasks: IStatusTask[]) => {
                const activeIndex = statusTasks.findIndex((task: IColumn) => `${task.id}a` === activeId);
                statusTasks[activeIndex].status.id = over.data.current?.data?.id;
                const order = arrayMove(statusTasks, activeIndex, over.data.current?.data?.id);
                updateOrderTasks({ data: order });
                return order;
            });
        }

        if (isActiveTask && isOverTask) {
            setTasksList((statusTasks: IStatusTask[]) => {
                const activeIndex = statusTasks.findIndex(
                    (statusTask: IStatusTask) => `${statusTask.id}a` === activeId
                );
                const overIndex = statusTasks.findIndex(
                    (statusTask: IStatusTask) => `${statusTask.id}a` === overId
                );
                if (statusTasks[activeIndex].status?.id !== statusTasks[overIndex].status.id) {
                    statusTasks[activeIndex].status.id = statusTasks[overIndex].status.id;
                }
                const order = arrayMove(statusTasks, activeIndex, overIndex);
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
                        {statusList?.map((item: IStatus) => {
                            return (
                                <Column
                                    key={item.id}
                                    name={item.name}
                                    id={item.id}
                                    projectId={Number(params.project)}
                                    statusTasks={tasksList?.filter(
                                        (task: IStatusTask) => task.status?.id == item.id
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
                                projectId={Number(params.project)}
                                    statusTasks={tasksList?.filter(
                                        (task: IStatusTask) => task.status?.id == activeColumn.id
                                    )}
                            />
                        ) : (
                            <></>
                        )}
                        {activeTask ? (
                            <TaskCard
                                key={'key'}
                                statusTask={activeTask}
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

export default ProjectView;
