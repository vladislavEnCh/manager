import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SmallSelect from '../../../shared/components/selects/small-select';
import Status from '../../../shared/components/status';
import { IColumn } from '../../../shared/types/columns.types';
import { ITask } from '../../../shared/types/task.types';
import { useUpdateTask } from '../../workspace/hooks/use-update-task';

type IStatusForm = {
    task: ITask;
    columnsList: IColumn[];
};

const StatusForm: FC<IStatusForm> = ({ task, columnsList }) => {
    const { control } = useForm({
        defaultValues: {
            columnId: task.column.name
        }
    });

    const { updateTask } = useUpdateTask();

    const handleSelect = (selectedOption: any) => {
        updateTask({
            data: { columnId: selectedOption },
            taskId: task.id
        });
    };

    return (
        <Controller
            control={control}
            name='columnId'
            render={({ field: { value, onChange } }) => {
                return (
                    <>
                        <SmallSelect
                            placeholder={value}
                            selectedOption={value}
                            color='grey'
                            setSelectedOption={(selectedOption) => {
                                handleSelect(selectedOption?.value);
                                onChange(selectedOption?.label);
                            }}
                            options={columnsList?.map((column: IColumn) => ({
                                value: column?.id,
                                label: column?.name
                            }))}
                        />
                    </>
                );
            }}
        />
    );
};

export default StatusForm;
