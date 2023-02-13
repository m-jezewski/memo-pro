import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { Modal } from "./modal";
import { TextInput } from "./textInput";

import type { Dispatch, SetStateAction } from "react";


interface CreateNoteModalProps {
    readonly isOpen: boolean
    readonly setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const CreateNoteModal = ({ isOpen, setIsOpen }: CreateNoteModalProps) => {
    const session = useSession()
    const [errorMessage, setErrorMessage] = useState('')

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title='New note'
            overlay={true}
        >
            <Formik
                initialValues={{ title: '', content: '' }}
                onSubmit={async (values, actions) => {
                    const res = await fetch('http://localhost:3000/api/note/create', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ title: values.title, content: values.content, uid: session.data?.user.uid })
                    })
                    if (!res.ok) {
                        setErrorMessage(res.statusText)
                    } else {
                        setIsOpen(false)
                    }
                    actions.resetForm()
                }}
                validate={(values) => {
                    if (!values.content) return { content: 'Note content is required' }
                    return {}
                }}
            >
                <Form className='w-full flex flex-col gap-4'>
                    <TextInput
                        label={<>Title <span className='text-light_blue_1'>(optional)</span></>}
                        name='title'
                        type='text'
                        maxLength={40}
                        placeholder='Note title'
                    />
                    <TextInput
                        label={'Note content'}
                        name='content'
                        as='textarea'
                        required
                        rows={7}
                        maxLength={10000}
                        placeholder="Your note..."
                    />
                    {errorMessage !== '' && <p>{errorMessage}</p>}
                    <button
                        className='bg-light_blue_1 font-medium transition p-2 w-full rounded-full mt-4 leading-6 hover:bg-white_1 hover:text-red_1'
                        type='submit'>
                        Add new note
                    </button>
                </Form>
            </Formik>
        </Modal>
    );
}

