import Image from "next/image";
import { useState, useEffect } from 'react'

import { Modal } from "../modal/modal";
import { NoteForm } from "../noteForm/noteForm";

import type { Note } from '@prisma/client';
import type { Dispatch, SetStateAction } from 'react'

import { useDeleteNote } from "@/hooks/useDeleteNote";
import { useEditNote } from "@/hooks/useEditNote";

interface NoteModalProps {
    readonly note: Note
    readonly isOpen: boolean
    readonly setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const NoteModal = ({ note, isOpen, setIsOpen }: NoteModalProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const editNoteMutation = useEditNote(note.id, () => { setIsEditing(false) })
    const deleteNoteMutation = useDeleteNote(note.id)

    useEffect(() => {
        setIsEditing(false)
    }, [isOpen])

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
                            onClick={() => { deleteNoteMutation.mutate() }}
                            className='rounded-full p-2 transition-all hover:bg-red-900'>
                            <Image src='/delete.svg' width={32} height={32} alt='Remove note' />
                        </button>
                    </div>
                </>}
        </Modal>
    );
}

