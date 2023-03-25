import { Form, Formik } from 'formik';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { TextInput } from '../textInput/textInput';

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values) => {
        const res = await signIn('credentials', { redirect: false, email: values.email, password: values.password });
        if (res && !res.ok) {
          if (res.status === 401) setErrorMessage('Sorry, we could not find your account');
          else setErrorMessage('Sorry, something went wrong');
        }
      }}
    >
      <Form className="flex flex-col w-full gap-4">
        <TextInput label="Email" name="email" type="email" required />
        <TextInput label="Password" name="password" type="password" required />
        {errorMessage !== '' && <p className="text-sm text-red_1 text-center">{errorMessage}</p>}
        <p className="text-center text-base">
          <span className="font-semibold">Demo account:</span> <br />
          login: test@test.com <br />
          password: test123
        </p>
        <button
          className="bg-light_blue_1 font-medium transition p-2 w-full rounded-full leading-6 hover:bg-white_1 hover:text-red_1"
          type="submit"
        >
          LOG IN
        </button>
      </Form>
    </Formik>
  );
};
