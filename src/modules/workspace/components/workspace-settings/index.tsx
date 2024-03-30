import React from 'react'
import { useGetWorkspace } from '../../hooks/use-get-workspace';
import { useParams } from 'next/navigation';

const WorkspaceSettings = () => {
    const params = useParams();
	const { workspace } = useGetWorkspace(Number(params.workspace));

	console.log(workspace)
  return (
	<div className='w-full h-24 bg-white'>
		<p className='text-2xl text-neutral-800'>{workspace?.name}</p>
	</div>
  )
}

export default WorkspaceSettings