'use client';

import { FC } from 'react';

import WorkspaceSettings from '../../../modules/workspace/components/workspace-settings';

type ILayout = {
    children: React.ReactNode;
};

const WorkspaceLayout: FC<ILayout> = ({ children }) => {
    return (
        <div className='h-full'>
            <WorkspaceSettings />
            {children}
        </div>
    );
};

export default WorkspaceLayout;
