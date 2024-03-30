import CloseIcon from '@mui/icons-material/Close';
import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { FC, ReactNode } from 'react';

type IAppDialog = {
    isOpen: boolean;
    handleClose: () => void;
    children: ReactNode;
};

const AppDialog: FC<IAppDialog> = ({ isOpen, handleClose, children }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <CloseIcon className='absolute top-4 right-4 cursor-pointer' />
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};

export default AppDialog;
