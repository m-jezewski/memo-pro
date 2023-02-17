import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState, useEffect } from 'react'

import { Modal } from "../modal/modal";
import { NoteForm } from "../noteForm/noteForm";

import type { Note } from '@prisma/client';
import type { Dispatch, SetStateAction } from 'react'

interface NoteModalProps {
    readonly note: Note
    readonly isOpen: boolean
    readonly setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const NoteModal = ({ note, isOpen, setIsOpen }: NoteModalProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const queryClient = useQueryClient()

    useEffect(() => {
        setIsEditing(false)
    }, [isOpen])


    const editNoteMutation = useMutation({
        mutationFn: async (formValues: { readonly title: string, readonly content: string }) => {
            await fetch('http://localhost:3000/api/note/edit', {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: formValues.title, content: formValues.content, id: note.id })
            })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['notes'] })
            setIsEditing(false)
        }
    })

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={note.title || ''}
        >
            {isEditing ?
                <NoteForm
                    mutation={editNoteMutation}
                    initialValues={{
                        title: note.title || '',
                        content: note.content || ''
                    }}
                    btnMessageIdle='Save'
                    btnMessageSubmitting='Saving changes...'
                /> :
                <>
                    <p className='whitespace-pre-line'>{note.content}</p>
                    <div className='flex justify-around w-full'>
                        <button
                            onClick={() => { setIsEditing(true) }}
                            className='rounded-full p-2 transition-all hover:bg-light_blue_1'>
                            <Image src='/edit.svg' width={32} height={32} alt='Edit note' />
                        </button>
                        <button
                            onClick={() => { }}
                            className='rounded-full p-2 transition-all hover:bg-red-900'>
                            <Image src='/delete.svg' width={32} height={32} alt='Remove note' />
                        </button>
                    </div>
                </>}
        </Modal>
    );
}

