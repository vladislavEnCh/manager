'use client';

import { FC } from 'react';
import WorkspaceLayout from '../../../shared/components/layouts/workspace-layout';

type ILayout = {
    children: React.ReactNode;
};

const layout: FC<ILayout> = ({ children }) => {
    return <WorkspaceLayout>{children}</WorkspaceLayout>;
};

export default layout;
