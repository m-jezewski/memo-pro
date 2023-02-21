import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import Image from "next/image";
import { useState } from 'react'

import { NoteModal } from "./noteModal";

import type { Note } from "@prisma/client";

import { useDeleteNote } from "@/hooks/useDeleteNote";

export const NoteCard = (note: Note) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const deleteNoteMutation = useDeleteNote(note.id)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: note.id });
    const styles = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    if (deleteNoteMutation.isLoading) {
        return (
            <div className='rounded-lg p-4 h-[220px] w-full sm:w-1/2-1rem lg:w-1/3-1rem flex'>
                <span className='loader' />
            </div>
        )
    }

    return (
        <>
            <div
                ref={setNodeRef}
                style={styles}
                {...attributes}
                {...listeners}
                className='flex flex-col bg-light_blue_transparent gap-1 rounded-lg p-4 h-[220px]
                transition-colors cursor-pointer hover:brightness-[1.15] over:saturate-[1.15] w-full sm:w-1/2-1rem lg:w-1/3-1rem'
                tabIndex={0}
                onClick={() => { console.log('onclick'); setIsModalOpen(!isModalOpen) }}>
                <header className='flex justify-between'>
                    <h4 className='uppercase font-medium'>{note.title}</h4>
                    <div className='flex gap-4'>
                        <button onClick={() => { deleteNoteMutation.mutate() }}>
                            <Image src={'/delete.svg'} alt='Remove note' width={24} height={24} />
                        </button>
                    </div>
                </header>
                <p className='grow text-sm line-clamp-[8] break-words whitespace-pre-line'>
                    {note.content}
                </p>
            </div>
            <NoteModal
                note={note}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            />
        </>
    )
}
