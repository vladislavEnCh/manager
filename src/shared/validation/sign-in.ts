import * as Yup from 'yup';

export const signInSchema = Yup.object({
	email: Yup.string()
		.email('Please provide a properly formatted email address')
		.max(100)
		.required('Email is required'),
	password: Yup.string()
		.max(100)
		.required('Password is required'),
}).required();
