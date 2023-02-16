import { Form, Formik } from "formik";
import { useState } from "react";

import { TextInput } from "./textInput";


export const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('')

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={async values => {
                const res = await fetch('http://localhost:3000/api/user/create', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                })
                if (!res.ok) setErrorMessage(res.statusText)
            }}>
            <Form className='flex flex-col w-full gap-4'>
                <TextInput
                    label='Email'
                    name='email'
                    type='email'
                    required
                />
                <TextInput
                    label='Password'
                    name='password'
                    type='password'
                    required
                />
                {errorMessage !== '' && <p className='text-sm text-red_1 text-center'>{errorMessage}</p>}
                <button className='bg-light_blue_1 font-medium transition p-2 w-full rounded-full leading-6 hover:bg-white_1 hover:text-red_1 mt-5' type='submit'>SIGN UP</button>
            </Form>
        </Formik>
    );
}