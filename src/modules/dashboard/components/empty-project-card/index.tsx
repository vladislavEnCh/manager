import AddIcon from '@mui/icons-material/AddCircle';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { AppButton } from '../../../../shared/components/buttons/app-button';
import AppDialog from '../../../../shared/components/dialog';
import FormInput from '../../../../shared/components/form-input';
import { ICreateWorkspaceDto } from '../../../../shared/services/dto/create.dto';
import { workspaceService } from '../../../../shared/services/workspace.service';

const EmptyProjectCard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { push } = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: 'onTouched'
    });

    const { mutate, isLoading } = useMutation({
        mutationKey: ['createWorkspace'],
        mutationFn: (data: ICreateWorkspaceDto) => workspaceService.createWorkspaces(data),
        onSuccess(res) {
            push(`workspace/${res.data.id}`);
        }
    });

    const onSubmit: SubmitHandler<any> = (data: ICreateWorkspaceDto) => {
        mutate({
            name: data.name
        });
    };

    const openDialogHandler = () => {
        setIsOpen(true);
    };

    const closeDialogHandler = () => {
        setIsOpen(false);
    };

    return (
        <>
            <AppDialog
                isOpen={isOpen}
                handleClose={closeDialogHandler}
            >
                <div className='w-[320px]'>
                    <p className='text-xl '>Create you own workspace</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormInput
                            name='name'
                            label='Name'
                            placeholder=''
                            register={register}
                            rules={{
                                required: 'Name is required',
                                minLength: {
                                    value: 2,
                                    message: 'Name must be at least 2 characters long'
                                }
                            }}
                            error={errors.name}
                        />

                        <AppButton
                            type='submit'
                            text='Create'
                            fullWidth
                            disabled={errors?.name && errors?.name?.message?.length > 0}
                            className='mt-4'
                            loading={isLoading}
                        />
                    </form>
                </div>
            </AppDialog>
            <button
                onClick={openDialogHandler}
                className='flex max-w-[320px] h-[162px]  max-h-[200px] w-full rounded bg-gray-300 hover:bg-gray-500 justify-center px-8 py-10 cursor-pointer transition-colors duration-300 ease-in-out'
            >
                <div className='flex h-full w-full rounded justify-center bg-gray-400  items-center'>
                    <AddIcon fontSize='large' />
                </div>
            </button>
        </>
    );
};

export default EmptyProjectCard;
