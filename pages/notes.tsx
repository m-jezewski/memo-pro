/* eslint-disable functional/prefer-readonly-type  -- Notes*/
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";

import type { Note } from '@prisma/client';

import { CreateNoteModal } from "@/components/notes/createNoteModal";
import { NoteCard } from "@/components/notes/noteCard";
import { useDnd } from '@/hooks/useDnd';
import { useGetNotes } from '@/hooks/useGetNotes';

const Notes = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [openCreateNote, setOpenCreateNote] = useState(false)
    const noteQuery = useGetNotes()
    const { sensors, handleDragEnd } = useDnd(setNotes)

    useEffect(() => {
        if (noteQuery.data) setNotes(noteQuery.data)
    }, [noteQuery.data])

    return (
        <div className='container flex flex-col mx-auto min-h-screen text-white_1'>
            <header className='flex justify-between p-8 pb-0 gap-y-4 flex-col sm:flex-row'>
                <h1 className='font-rowdies text-2xl md:text-5xl mx-auto sm:mx-0'>MEMO<span className='text-red_1'>PRO</span></h1>
                <div className='flex gap-16 justify-center'>
                    <button
                        onClick={() => { setOpenCreateNote(true) }}
                        className='font-semibold'>
                        Create <span className='text-red_1'>note</span>
                    </button>
                    <button className='font-semibold' onClick={async () => { await signOut({ callbackUrl: '/' }) }}>Logout</button>
                </div>
            </header>
            <main className='flex flex-wrap content-start gap-4 py-8 px-4 grow'>
                {noteQuery.isLoading || noteQuery.data === null ? <span className='loader'></span> :
                    <>
                        {notes ?
                            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                                <SortableContext items={[...notes]}>
                                    {notes.map(note => (
                                        <NoteCard
                                            key={note.id}
                                            id={note.id}
                                            title={note.title}
                                            authorId={note.authorId}
                                            content={note.content}
                                            orderIndex={note.orderIndex}
                                        />
                                    ))}
                                </SortableContext>
                            </DndContext> : null}
                        <button
                            onClick={() => { setOpenCreateNote(true) }}
                            className='h-56  grid items-center rounded-lg justify-center transition-all hover:backdrop-brightness-150
                             hover:backdrop-contrast-[0.9] hover:backdrop-saturate-[1.15] w-full sm:w-1/2-1rem lg:w-1/3-1rem order-last'>
                            <Image src='/add.svg' alt='Add new note' width={48} height={48} />
                        </button>
                    </>}
                <CreateNoteModal isOpen={openCreateNote} setIsOpen={setOpenCreateNote} />
            </main>
        </div>
    );
}

export default Notes
