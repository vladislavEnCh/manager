'use client'
import EmptyProjectCard from './components/empty-project-card';
import ProjectCard from './components/project-card';
import Loader from '../../shared/components/loader';
import { useWorkspaces } from '../../shared/hooks/use-get-workspaces.hook';
import { IWorkspace } from '../../shared/types/workspace.types';

const DashboardViews = () => {
    const { workspacesList, isLoading, error } = useWorkspaces();

    if (isLoading) return <Loader />;

    return (
        <div className='h-full w-full p-4 bg-slate-50'>
            <div className='w-full flex flex-wrap gap-6'>
                {workspacesList?.map((item: IWorkspace) => {
                    return (
                        <ProjectCard
                            item={item}
                            key={item.id}
                        />
                    );
                })}
                <EmptyProjectCard />
            </div>
        </div>
    );
};

export default DashboardViews;
