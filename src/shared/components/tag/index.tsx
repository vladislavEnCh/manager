import { FC } from 'react';


interface ITagContainer {
    name: string;
    color: string;
}
//orange

const TagContainer: FC<ITagContainer> = ({ name, color }) => {
    return (
        <div
            style={{ backgroundColor: color }}
            className={`px-2 py-1 rounded-3xl opacity-50 z-20`}
        >
            <p  className={`text-xs font-semibold  text-white`}>{name}</p>
        </div>
    );
};

export default TagContainer;
