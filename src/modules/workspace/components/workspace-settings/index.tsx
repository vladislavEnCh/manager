import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { IProject } from '../../../../shared/types/project.types';
import { useGetWorkspace } from '../../hooks/use-get-workspace';
import CreateProjectDialog from './components/create-project-dialog';
import { useGetProject } from './hooks/use-get-projects';

const WorkspaceSettings = () => {
    const [isOpen, setIsOpen] = useState(false);
    const params = useParams();
    const { push } = useRouter();
    const { workspace } = useGetWorkspace(Number(params.workspace));

    const { projects } = useGetProject(Number(params.workspace));

    const openDialogHandler = () => {
        setIsOpen(true);
    };

    const closeDialogHandler = () => {
        setIsOpen(false);
    };

    const navigateHandler = (id: number) => {
        push(`${id}`)
    }

    return (
        <>
            <CreateProjectDialog
                isOpen={isOpen}
                closeDialogHandler={closeDialogHandler}
            />
            <div className='w-full h-24 bg-white p-4'>
                <div className='text-xl text-neutral-800 flex gap-4 items-center'><p className='text-xs text-neutral-400'>Workspace:</p> {workspace?.name}</div>
                <div className='flex gap-4'>
                    Projects{' '}
                    {projects?.map((project: IProject) => {
                        return <button onClick={() => navigateHandler(project.id)} className={`${params.project as any == project.id?"bg-slate-300":""} hover:bg-slate-400 cursor-pointer rounded p-1`} key={project.id}>{project?.name}</button>;
                    })}
                    <button
                        onClick={openDialogHandler}
                        className='text-blue-500'
                    >
                        +Create project
                    </button>
                </div>
            </div>
        </>
    );
};

export default WorkspaceSettings;
