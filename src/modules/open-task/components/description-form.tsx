import CheckIcon from '@mui/icons-material/Check';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { FC, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { ITask } from '../../../shared/types/task.types';
import { useUpdateTask } from '../../workspace/hooks/use-update-task';

type IDescriptionForm = {
    task: ITask;
};

const DescriptionForm: FC<IDescriptionForm> = ({ task }) => {
    const [isEdit, setIsEdit] = useState(false);

    const textArea: any = useRef(null);

    const { control, handleSubmit, register, setFocus } = useForm({
        defaultValues: {
            description: task.description ? task.description : task.name ? task.name : 'wefew'
        }
    });

    const { updateTask } = useUpdateTask();

    const onSubmit = (value: any) => {
        updateTask({
            data: { description: value.description },
            taskId: task.id
        });
        setIsEdit(false);
    };

    const editHandler = () => {
        setIsEdit(true);
        setTimeout(() => {
            setFocus('description');
        }, 300);
    };

    return (
        <div className='flex gap-8  flex-col'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-3'>
                    <p className='text-xl font-semibold'>Description</p>
                    {isEdit ? (
                        <button
                            onClick={handleSubmit(onSubmit)}
                            className='cursor-pointer'
                        >
                            <CheckIcon className='cursor-pointer' />
                        </button>
                    ) : (
                        <button onClick={editHandler}>
                            <ModeEditIcon className='cursor-pointer' />
                        </button>
                    )}
                </div>
                <textarea
                    disabled={!isEdit}
                    className={`py-4 mt-2 rounded-lg font-normal text-neutral-500 ${isEdit?'px-2': ''}`}
                    {...register('description')}
                    rows={4}
                    cols={40}
					
                />
            </form>
        </div>
    );
};

export default DescriptionForm;
