import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LabelIcon from '@mui/icons-material/Label';
import { Avatar } from '@mui/material';
import { FC, useState } from 'react';

import { IColumn } from '../../../shared/types/columns.types';
import { ITask } from '../../../shared/types/task.types';
import CalendarForm from './calendar-form';
import DescriptionForm from './description-form';
import PriorityForm from './priority-form';
import StatusForm from './status-form';

type ISideForm = {
    task: ITask;
    columnsList: IColumn[];
};


const SideForm: FC<ISideForm> = ({ task, columnsList }) => {
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex gap-8 items-center'>
                <div className='flex gap-1 w-[100px]'>
                    <HourglassTopIcon className='text-slate-700' />{' '}
                    <p className='text-base text-slate-500'>Status</p>
                </div>

                <StatusForm
                    task={task}
                    columnsList={columnsList}
                />
            </div>
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

            <PriorityForm task={task}/>
            <div className='flex gap-8 items-center'>
                <div className='flex gap-1 w-[100px]'>
                    <LabelIcon className='text-slate-700' />{' '}
                    <p className='text-base text-slate-500'>Label</p>
                </div>
            </div>
            

            <DescriptionForm task={task} />
        </div>
    );
};

export default SideForm;
