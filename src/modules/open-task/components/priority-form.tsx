import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SmallSelect from '../../../shared/components/selects/small-select';
import { ITask } from '../../../shared/types/task.types';
import { useUpdateTask } from '../../workspace/hooks/use-update-task';

const priorityList = [
    { label: 'hight', value: 'hight' },
    { label: 'medium', value: 'medium' },
    { label: 'low', value: 'low' }
];

type IPriorityForm = {
    task: ITask;
};

const PriorityForm: FC<IPriorityForm> = ({ task }) => {
    const { control } = useForm({
        defaultValues: {
            priority: task.priority
        }
    });

    const { updateTask } = useUpdateTask();

    const handleSelect = (selectedOption: any) => {
        updateTask({
            data: { priority: selectedOption },
            taskId: task.id
        });
    };
    return (
        <div className='flex gap-8 items-center'>
            <div className='flex gap-1 w-[100px]'>
                <PriorityHighIcon className='text-slate-700' />{' '}
                <p className='text-base font-normal text-slate-500'>Priority</p>
            </div>

            <Controller
                control={control}
                name='priority'
                render={({ field: { value, onChange } }) => {
                    return (
                        <>
                            <SmallSelect
                                placeholder={value}
                                selectedOption={value}
                                setSelectedOption={(selectedOption) => {
                                    handleSelect(selectedOption?.value);
                                    onChange(selectedOption?.label);
                                }}
                                color={
                                    value == 'hight'
                                        ? 'red'
                                        : value == 'medium'
                                          ? 'orange'
                                          : '#22C55E'
                                }
                                options={priorityList}
                            />
                        </>
                    );
                }}
            />
        </div>
    );
};

export default PriorityForm;
