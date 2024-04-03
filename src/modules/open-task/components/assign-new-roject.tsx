import { useParams } from 'next/navigation';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SmallSelect from '../../../shared/components/selects/small-select';
import { IProject } from '../../../shared/types/project.types';
import { ITask } from '../../../shared/types/task.types';
import { useGetProject } from '../../workspace/components/workspace-settings/hooks/use-get-projects';
import { useAssignTask } from '../hooks/use-assign-task';

type IAssignNewProject = {
    task: ITask;
};

const AssignNewProject: FC<IAssignNewProject> = ({ task }) => {
    const [isAddingNewProject, setIsAddingNewProject] = useState(false);
    const params = useParams();

    const { control } = useForm();

    const { assignTaskTask } = useAssignTask();

    const { projects, projectsWithoutCurrent } = useGetProject(Number(params.workspace), task);

    const handleSelect = (selectedOption: any) => {
        assignTaskTask({
            taskId: task.id,
            projectId: selectedOption
        });
        setIsAddingNewProject(false);
    };
    return (
        <div className=''>
            {isAddingNewProject ? (
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
                                    options={projectsWithoutCurrent?.map((project: IProject) => ({
                                        value: project?.id,
                                        label: project?.name
                                    }))}
                                    color={'#CBD5E1'}
                                    onBlur={() => setIsAddingNewProject(false)}
                                    menuIsOpen={true}
                                />
                            </>
                        );
                    }}
                />
            ) : projectsWithoutCurrent ? (
                <button onClick={() => setIsAddingNewProject(true)}>+ Assign to project</button>
            ) : (
                <></>
            )}
        </div>
    );
};

export default AssignNewProject;
