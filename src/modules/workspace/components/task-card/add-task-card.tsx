import { FC } from 'react';

type IAddTaskCard = {
    onClick: () => void;
};

const AddTaskCard: FC<IAddTaskCard> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className='h-10 mb-4 w-full cursor-pointer text-lg items-center justify-center rounded-lg bg-white'
        >
            Add Task
        </button>
    );
};

export default AddTaskCard;
