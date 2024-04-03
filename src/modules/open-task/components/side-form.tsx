import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LabelIcon from '@mui/icons-material/Label';
import { Avatar } from '@mui/material';
import { FC, useState } from 'react';

import { IColumn } from '../../../shared/types/columns.types';
import { IStatusTask } from '../../../shared/types/status-task.types';
import { IStatus } from '../../../shared/types/status.types';
import { ITask } from '../../../shared/types/task.types';
import AssignNewProject from './assign-new-roject';
import CalendarForm from './calendar-form';
import DescriptionForm from './description-form';
import PriorityForm from './priority-form';
import StatusForm from './status-form';

type ISideForm = {
    task: ITask;
};

const SideForm: FC<ISideForm> = ({ task }) => {
    return (
        <div className='flex flex-col gap-6'>
            <CalendarForm task={task} />
            <div className='flex gap-8 items-center'>
                <div className='flex gap-1 w-[100px]'>
                    <EmojiPeopleIcon className='text-slate-700' />{' '}
                    <p className='text-base font-normal text-slate-500'>Assignee</p>
                </div>
                <Avatar>H</Avatar>
            </div>

            <div className='flex gap-8 items-center'>
                <div className='flex gap-1 w-[100px]'>
                    <EmojiPeopleIcon className='text-slate-700' />{' '}
                    <p className='text-base font-normal text-slate-500'>Reporter</p>
                </div>
                <p className=''>{task.reporter.email}</p>
            </div>

            <PriorityForm task={task} />
            <div className='flex gap-8 items-center'>
                <div className='flex gap-1 w-[100px]'>
                    <LabelIcon className='text-slate-700' />{' '}
                    <p className='text-base text-slate-500'>Label</p>
                </div>
            </div>
            <div className='flex gap-8 items-center'>
                <div className='flex gap-1 w-[100px]'>
                    <HourglassTopIcon className='text-slate-700' />{' '}
                    <p className='text-base text-slate-500'>Status</p>
                </div>
                <div className='gap-3 flex flex-col'>
                    {task?.statusTask.map((item: IStatusTask) => {
                        const project = item?.projects[0].name;
                        return (
                            <div
                                className='flex gap-3 rounded-md bg-slate-300 px-2 items-center'
                                key={item.id}
                            >
                                <div className='text-sm font-bold'>{project}</div>
                                <StatusForm
                                    task={task}
                                    defaultValue={item.status.name}
                                />
                                {/*<div>{item?.status?.name}</div>*/}
                            </div>
                        );
                    })}
                        <AssignNewProject task={task}/>
                </div>
            </div>

            <DescriptionForm task={task} />
        </div>
    );
};

export default SideForm;
