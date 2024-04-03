import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SmallSelect from '../../../shared/components/selects/small-select';
import Status from '../../../shared/components/status';
import { IColumn } from '../../../shared/types/columns.types';
import { IStatus } from '../../../shared/types/status.types';
import { ITask } from '../../../shared/types/task.types';
import { useUpdateTask } from '../../workspace/hooks/use-update-task';
import { useUpdateStatusTask } from '../hooks/use-update-status-task';
import { useGetStatuses } from '../../project/hooks/use-get-statuses';
import { useParams } from 'next/navigation';

type IStatusForm = {
    task: ITask;
    defaultValue: string;
};

const StatusForm: FC<IStatusForm> = ({ task, defaultValue }) => {
    const params = useParams();
    const { statusList } = useGetStatuses(Number(params.project));

    const { control } = useForm({
        defaultValues: {
            columnId: defaultValue
        }
    });

    const { updateStatusTask } = useUpdateStatusTask();

    const handleSelect = (selectedOption: any) => {
        console.log(selectedOption);
        updateStatusTask({
            statusTaskId: task.id,
            newStatusId: selectedOption
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
                            setSelectedOption={(selectedOption) => {
                                handleSelect(selectedOption?.value);
                                onChange(selectedOption?.label);
                            }}
                            options={statusList?.map((column: IColumn) => ({
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
