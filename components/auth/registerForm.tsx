import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";

import { TextInput } from "../textInput";

import type { User } from "@prisma/client";

import { useCreateNote } from "@/hooks/useCreateNote";
import InitialData from "utils/initialContent.json"


interface formValues {
    readonly email: string,
    readonly password: string,
}

export const RegisterForm = () => {
    const createNoteMutation = useCreateNote()

    const createUserMutation = useMutation({
        mutationFn: async (values: formValues) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_CALLBACK_URL}/api/user/create`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            })
            if (res.status !== 200) throw new Error(res.statusText)
            const jsonData: User = await res.json()
            return jsonData
        },
        onSuccess(data, variables) {
            signIn("credentials", {
                redirect: false,
                email: variables.email,
                password: variables.password
            }).then(() => {
                InitialData.forEach((note) => {
                    createNoteMutation.mutate({ ...note, uid: data.id })
                });
            }).catch(err => console.log(err))
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