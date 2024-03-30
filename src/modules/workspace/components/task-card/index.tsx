import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import PriorityContainer from '../../../../shared/components/priority';
import TagContainer from '../../../../shared/components/tag';
import { ITask } from '../../../../shared/types/task.types';
import { useSideTask } from '../../../../store/side-task';
import { useTasksDebounce } from '../../hooks/use-tasks-debounce';
import { useRouter } from 'next/navigation';

type ITaskCard = {
    task: ITask;
};

const TaskCard: FC<ITaskCard> = ({ task }) => {
    const queryClient = useQueryClient();

    const { push } = useRouter();
    const { register, control, watch } = useForm({
        defaultValues: {
            name: task.name
        }
    });

    useTasksDebounce({
        watch,
        taskId: task.id
    });

    const {
        setNodeRef: cardNode,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: `${task.id}a`,
        data: {
            type: 'Task',
            data: task
        }
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    const { setIsOpenSideTask, setSideTaskId } = useSideTask();

    if (isDragging) {
        return (
            <div
                ref={cardNode}
                style={style}
                className='w-full outline-dashed outline-stone-400 rounded-md px-4 h-[250px]'
            />
        );
    }

    const selectTaskHandled = () => {
        push(`?task=${task.id}`);
        queryClient.removeQueries({ queryKey: ['task', task.id] });
        setIsOpenSideTask(false);
        setSideTaskId(null);
        setSideTaskId(task.id);
        setIsOpenSideTask(true);
    };

    return (
        <button
            ref={cardNode}
            onClick={selectTaskHandled}
            style={style}
            className='w-full flex z-10 items-start cursor-pointer flex-col bg-white shadow-md rounded-[20px] px-4 pb-4 h-[150px] justify-between'
        >
            <div className='flex flex-col items-start w-full'>
                <div
                    {...attributes}
                    {...listeners}
                    className='w-full flex items-center justify-center cursor-pointer z-20'
                >
                    <DragHandleIcon
                        color='inherit'
                        className='text-neutral-200'
                        fontSize='medium'
                    />
                </div>
                    <TagContainer
                        name='Design'
                        color={'rgba(245, 40, 145, 0.8)'}
                    />
                <div className='z-20'>
                    <input
                        {...register('name')}
                        id={task.name}
                        className={`bg-transparent text-base font-semibold rounded my-2 focus:outline-none focus:bg-white focus:border`}
                    />
                </div>
            </div>
            <div className='flex flex-row gap-4'>
                <p>Priority:</p> <PriorityContainer name={task.priority} />
            </div>
        </button>
    );
};

export default TaskCard;
