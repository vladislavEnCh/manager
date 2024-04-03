import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import ShareIcon from '@mui/icons-material/Share';
import { CircularProgress } from '@mui/material';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useGetTask } from '../workspace/hooks/use-get-task';
import { useGetColumns } from '../workspace/hooks/use-get-columns';
import SideForm from './components/side-form';
import CommentsMenu from './components/menu';
import { useSideTask } from '../../store/side-task';
import { useGetStatuses } from '../project/hooks/use-get-statuses';


const OpenTaskView = () => {
	const params = useParams();

    const { isOpenSideTask, setIsOpenSideTask, taskId } = useSideTask();
    const { task, isLoading } = useGetTask(taskId!);
    

    const router = useRouter();
    const pathname = usePathname();

    const closeSide = () => {
        setIsOpenSideTask(false)
        router.replace(pathname, undefined,);
    }

    return (
        <div
            className={`fixed top-0 z-40 right-0 h-full bg-white transition-transform duration-300 transform ${isOpenSideTask ? 'translate-x-0' : 'translate-x-full'}`}
            style={{ width: '500px' }}
        >
            {isLoading  ? (
                <CircularProgress />
            ) : (
                <div className='relative p-8'>
                    <div className='flex justify-between'>
                        <button onClick={closeSide}>
                            <KeyboardTabIcon className='cursor-pointer' />
                        </button>
                        <button onClick={() => setIsOpenSideTask(false)}>
                            <ShareIcon className='cursor-pointer' />
                        </button>
                    </div>
                    <div className='flex flex-col mt-8 mb-12'>
                        <p className='text-black text-4xl font-bold'>{task?.name}</p>
                    </div>
                    {task && (
                        <SideForm
                            task={task}
                        />
                    )}
                    <CommentsMenu />
                </div>
            )}
        </div>
    );
}

export default OpenTaskView