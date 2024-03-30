import React, { FC } from 'react';

type IAddColumn = {
    onClick: () => void;
};

const AddColumn: FC<IAddColumn> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className='h-20 w-[350px] cursor-pointer rounded-lg bg-cyan-700 p-4'
        >
            Add Column
        </button>
    );
};

export default AddColumn;
