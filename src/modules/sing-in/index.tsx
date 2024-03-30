import React from 'react';

import SignInForm from './components/form';

const SignInView = () => {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='max-w-[800px] w-full flex flex-col border border-cyan-800 px-4 py-8 mt-20 rounded'>
                <SignInForm />
            </div>
        </div>
    );
};

export default SignInView;
