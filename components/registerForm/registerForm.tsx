import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";

import { TextInput } from "../textInput/textInput";

interface formValues {
    readonly email: string,
    readonly password: string,
}

export const RegisterForm = () => {

    const createUserMutation = useMutation({
        mutationFn: async (values: formValues) => {
            const res = await fetch('http://localhost:3000/api/user/create', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            })
            if (res.status !== 200) throw new Error(res.statusText)
        },
    })

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
                createUserMutation.mutate(values)
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
                {createUserMutation.isError && <p className='text-sm text-red_1 text-center'>{String(createUserMutation.error)}</p>}
                <button className='bg-light_blue_1 font-medium transition p-2 w-full rounded-full leading-6 hover:bg-white_1 hover:text-red_1 mt-5' type='submit'>SIGN UP</button>
            </Form>
        </Formik>
    );
}