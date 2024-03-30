import type * as Yup from 'yup';
import { setIn } from 'final-form';

export const validateFormValues = (schema: Yup.ObjectSchema<any>) => {
	return async <T>(values: T) => {
		try {
			await schema.validate(values, {
				abortEarly: false
			});
		} catch (err: any) {
			const errors: any = err.inner?.reduce(
				(formError: object, innerError: { path: string; message: string }) => {
					return setIn(formError, innerError.path, innerError.message);
				},
				{}
			);
			return errors;
		}
	};
};
