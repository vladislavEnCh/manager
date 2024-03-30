import React, { useState } from 'react';
import SideComments from './side-comments';

const CommentsMenu = () => {
    const [selected, setSelected] = useState(1);
    return (
        <div className='mt-20'>
            <div className='flex gap-14'>
                <button
                    onClick={() => setSelected(1)}
                    className='flex-col justify-start items-start gap-[21px] inline-flex cursor-pointer'
                >
                    <p
                        className={
                            selected == 1
                                ? 'text-zinc-900 cursor-pointer'
                                : 'text-zinc-500 cursor-pointer'
                        }
                    >
                        Comments
                    </p>
                    <div
                        className={
                            selected == 1
                                ? 'self-stretch h-[4px] bg-[#5021FF]  rounded-tl-sm rounded-tr-sm'
                                : 'self-stretch h-1 opacity-0 bg-neutral-200'
                        }
                    />
                </button>

                <button
                    onClick={() => setSelected(2)}
                    className='flex-col justify-start items-start gap-[21px] inline-flex cursor-pointer'
                >
                    <p
                        className={
                            selected == 2
                                ? 'text-zinc-900 cursor-pointer'
                                : 'text-zinc-500 cursor-pointer'
                        }
                    >
                        Files
                    </p>
                    <div
                        className={
                            selected == 2
                                ? 'self-stretch h-[4px] bg-[#5021FF] rounded-tl-sm rounded-tr-sm'
                                : 'self-stretch h-1 opacity-0 bg-neutral-200'
                        }
                    />
                </button>
            </div>
            {
              selected == 1?  <SideComments/>: <></>
            }
        </div>
    );
};

export default CommentsMenu;
