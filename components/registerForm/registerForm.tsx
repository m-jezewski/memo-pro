import { Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { TextInput } from '../textInput/textInput';
import { registerSchema } from '@/lib/validations/auth';
import { useCreateUser } from '@/hooks/useCreateUser';

export const RegisterForm = () => {
  const createUserMutation = useCreateUser();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={toFormikValidationSchema(registerSchema)}
      onSubmit={(values) => {
        createUserMutation.mutate(values);
      }}
    >
      <Form className="flex flex-col w-full gap-4">
        <TextInput label="Email" name="email" type="email" required />
        <TextInput label="Password" name="password" type="password" required />
        {createUserMutation.isError && (
          <p className="text-sm text-red_1 text-center">{createUserMutation.error?.message}</p>
        )}
        <button
          className="bg-light_blue_1 font-medium transition p-2 w-full rounded-full leading-6 hover:bg-white_1 hover:text-red_1 mt-5"
          type="submit"
        >
          SIGN UP
        </button>
      </Form>
    </Formik>
  );
};
