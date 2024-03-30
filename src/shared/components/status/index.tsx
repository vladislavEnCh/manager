import React, { FC } from 'react';

interface IStatus {
    name: string;
    color: string;
}

const Status: FC<IStatus> = ({ name, color }) => {
    return (
        <div
            style={{ backgroundColor: color }}
            className={`px-2 py-1 rounded-3xl opacity-50 flex flex-row items-center gap-2`}
        >
            <div className='rounded-full w-1 h-1 bg-white'></div>
            <p className={`text-xs font-semibold  text-white`}>{name}</p>
        </div>
    );
};

export default Status;
