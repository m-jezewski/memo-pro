import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";

import { Modal } from "./modal";
import { TextInput } from "./textInput";

import type { Dispatch, SetStateAction } from "react";

interface formValues {
    readonly title: string;
    readonly content: string;
}

interface CreateNoteModalProps {
    readonly isOpen: boolean
    readonly setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const CreateNoteModal = ({ isOpen, setIsOpen }: CreateNoteModalProps) => {
    const session = useSession()
    const queryClient = useQueryClient()

    const createNoteMutation = useMutation({
        mutationFn: async ({ title, content }: formValues) => {
            await fetch('http://localhost:3000/api/note/create', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title, content: content, uid: session.data?.user.uid })
            })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['notes'] })
            setIsOpen(false)
        },
    })

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title='New note'
            overlay={true}
        >
            <Formik
                initialValues={{ title: '', content: '' }}
                onSubmit={(values, actions) => {
                    createNoteMutation.mutate(values)
                    actions.resetForm()
                }}
                validate={(values) => {
                    if (!values.content) {
                        return { content: 'Note content is required' }
                    }
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
                    {createNoteMutation.isError && <p className='text-red_1 text-center'>Sorry!, Something went wrong!</p>}
                    <button
                        disabled={createNoteMutation.isLoading}
                        className={`font-medium transition p-2 w-full rounded-full mt-4 leading-6 bg-light_blue_1 
                        ${createNoteMutation.isLoading ? 'bg-dark_blue_1' : 'hover:bg-white_1 hover:text-red_1'}`}
                        type='submit'>
                        {createNoteMutation.isLoading ? 'Creating new note...' : 'Add new note'}
                    </button>
                </Form>
            </Formik>
        </Modal>
    );
}

