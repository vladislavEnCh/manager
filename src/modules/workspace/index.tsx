'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const WorkspaceView = () => {
    const { push } = useRouter();
    useEffect(() => {
        push(`/`);
    }, []);

    return <div></div>;
};

export default WorkspaceView;
