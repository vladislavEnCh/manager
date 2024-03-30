import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import DatePicker from '../../../shared/components/date-picker';
import { ITask } from '../../../shared/types/task.types';
import { useUpdateTask } from '../../workspace/hooks/use-update-task';

type ICalendarForm = {
    task: ITask;
};

const CalendarForm: FC<ICalendarForm> = ({ task }) => {
    const { register, control, watch, reset } = useForm({
        defaultValues: {
            finalDate: task?.finalDate
        }
    });

	const { updateTask } = useUpdateTask();


    return (
        <>
            <div className='flex gap-8 items-center'>
                <div className='flex gap-1 w-[100px]'>
                    <CalendarMonthIcon className='text-slate-700'/> <p className='text-base text-slate-500'>Due date</p>
                </div>
                <Controller
                    control={control}
                    name='finalDate'
                    render={({ field: { value, onChange } }) => {
                        return (
                            <DatePicker
                                value={value!}
                                onChange={(val) => {
									onChange(val)
									if(val)updateTask({
										data: {finalDate: val},
										taskId: task.id
									})
								}}
                            />
                        );
                    }}
                />
            </div>
        </>
    );
};

export default CalendarForm;
