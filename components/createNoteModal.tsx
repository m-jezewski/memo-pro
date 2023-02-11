import { useFormik } from "formik";
import { useSession } from "next-auth/react";

import { Modal } from "./modal";

import type { Dispatch, SetStateAction } from "react";

interface CreateNoteModalProps {
    readonly isOpen: boolean
    readonly setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const CreateNoteModal = ({ isOpen, setIsOpen }: CreateNoteModalProps) => {
    const session = useSession()
    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
        },
        onSubmit: async values => {
            console.log(values)

            const res = await fetch('http://localhost:3000/api/note/create', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: values.title, content: values.content, uid: session.data?.user.uid })
            })

            if (res.ok) {
                console.log(session)
                console.log('nooootka')
            }
        }
    })

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title='New note'
            overlay={true}
        >
            <form
                onSubmit={formik.handleSubmit}
                className='w-full'
            >
                <label
                    className='inline-block mb-1 text-sm'
                    htmlFor='title'>
                    Title <span className='text-light_blue_1'>(optional)</span>
                </label>
                <input
                    id='title'
                    name='title'
                    type='text'
                    maxLength={30}
                    className='bg-dark_blue_1 resize-none w-full rounded-md p-2'
                    placeholder="Note title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                />
                <label
                    className='mt-4 mb-1 inline-block text-sm'
                    htmlFor="content">
                    Note content
                </label>
                <textarea
                    id='content'
                    name='content'
                    className='bg-dark_blue_1 resize-none w-full rounded-md p-2'
                    rows={7}
                    maxLength={10000}
                    placeholder="Your note...."
                    value={formik.values.content}
                    onChange={formik.handleChange}
                />
                <button
                    className='bg-light_blue_1 font-medium transition p-2 w-full rounded-full mt-4 leading-6 hover:bg-white_1 hover:text-red_1'
                    type='submit'>
                    Add new note
                </button>
            </form>
        </Modal>
    );
}

