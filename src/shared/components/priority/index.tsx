import { FC } from 'react';

import { PriorityType } from '../../types/task.types';

interface IPriorityContainer {
    name: PriorityType;
}

const PriorityContainer: FC<IPriorityContainer> = ({ name }) => {
    const classNames: any = `px-2 py-1 rounded ${name == PriorityType.HIGHT && 'bg-red-500'} ${name == PriorityType.MEDIUM && 'bg-yellow-500'} ${name == PriorityType.LOW && 'bg-green-500'}`;

    return (
        <div className={classNames}>
            <p className='text-white font-bold text-xs'>{name}</p>
        </div>
    );
};

export default PriorityContainer;
