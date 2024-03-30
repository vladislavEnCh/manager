'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

import { AppButton } from '../../../../shared/components/buttons/app-button';
import FormInput from '../../../../shared/components/form-input';
import { RouterKeys } from '../../../../shared/constants/routes';
import { authService } from '../../../../shared/services/auth.service';
import { tokensService } from '../../../../shared/services/tokens.service';

const SignInForm = () => {
    const { push } = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const { mutate } = useMutation({
        mutationKey: ['singIn'],
        mutationFn: (data: any) => authService.signIn(data),
        onSuccess(res) {
            tokensService.saveAccessToken(res.data.accessToken)
            toast.success('Successfully login');
            push(RouterKeys.HOME);
        }
    });

    const onSubmit: SubmitHandler<any> = (data) => {
        mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                name='email'
                label='Email'
                placeholder='you@email.com'
                register={register}
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                    }
                }}
                error={errors.email}
            />
            <FormInput
                name='password'
                type='password'
                label='Password'
                placeholder='******'
                register={register}
                rules={{
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters long'
                    }
                }}
                error={errors.password}
            />
                <AppButton
                    type='submit'
                    text='Continue with email'
                    fullWidth
                    disabled={false}
                    className='mt-4'
                    loading={false}
                />
        </form>
    );
};

export default SignInForm;
