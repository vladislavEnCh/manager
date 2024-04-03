import { useParams } from 'next/navigation';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AppButton } from '../../../../../../shared/components/buttons/app-button';
import AppDialog from '../../../../../../shared/components/dialog';
import FormInput from '../../../../../../shared/components/form-input';
import { ICreateProjectDto } from '../../../../../../shared/services/dto/create.dto';
import { useCreateProject } from '../../hooks/use-create-project';
import { useGetProject } from '../../hooks/use-get-projects';

type ICreateProjectDialog = {
    isOpen: boolean;
    closeDialogHandler: () => void;
};

const CreateProjectDialog: FC<ICreateProjectDialog> = ({ isOpen, closeDialogHandler }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: 'onTouched'
    });

    const params = useParams();

    const { projects } = useGetProject(Number(params.workspace));

    const { createProject } = useCreateProject();

    const onSubmit: SubmitHandler<any> = (data: ICreateProjectDto) => {
        createProject({
            name: data.name,
            // @ts-ignore
            workspace_id: params.workspace
        });
        closeDialogHandler();
    };
    return (
        <AppDialog
            isOpen={isOpen}
            handleClose={closeDialogHandler}
        >
            <div className='w-[320px]'>
                <p className='text-xl '>Create you own Project</p>
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
                        disabled={!!errors?.name}
                        className='mt-4'
                        //loading={isLoading}
                    />
                </form>
            </div>
        </AppDialog>
    );
};

export default CreateProjectDialog;
