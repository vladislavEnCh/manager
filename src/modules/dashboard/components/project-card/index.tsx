'use client'
import { IconButton, MenuItem, Popover, Typography } from '@mui/material';
import { FC, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IWorkspace } from '../../../../shared/types/workspace.types';
import { useRouter } from 'next/navigation';

type IProjectCard = {
    item: IWorkspace;
};

const ProjectCard: FC<IProjectCard> = ({ item }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { push } = useRouter();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const navigateToWorkspace = (e: any) => {
        push(`workspace/${item.id}`)
    };

    return (
        <div
            onClick={navigateToWorkspace}
            className='w-[320px] h-full cursor-pointer border border-violet-500 rounded hover:opacity-50 p-5 relative'
        >
            <div className='flex justify-between items-center'>
                <Typography variant='h5' component='h2'>
                    {item?.name}
                </Typography>
                <IconButton className='absolute top-4 right-4' aria-describedby={id} onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                >
                    <MenuItem onClick={handleClose}>
                        <DeleteForeverIcon />
                        Delete
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <SettingsIcon />
                        Settings
                    </MenuItem>
                </Popover>
            </div>
            <div className='flex justify-between items-end h-20'>
                <Typography variant='body2' color='textSecondary'></Typography>
                <Typography variant='body2' color='textSecondary'>
                    13/20
                </Typography>
            </div>
        </div>
    );
};

export default ProjectCard;
