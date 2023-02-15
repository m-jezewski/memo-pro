import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useState } from "react";

import type { Note } from "@prisma/client";

import { CreateNoteModal } from "@/components/createNoteModal";
import { NoteCard } from "@/components/noteCard";



const Notes = () => {
    const [openCreateNote, setOpenCreateNote] = useState(false)
    const noteQuery = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            const res = await fetch('http://localhost:3000/api/note/get')
            const data: readonly Note[] = await res.json()
            return data
        }
    })

    return (
        <div className='container flex flex-col mx-auto min-h-screen text-white_1'>
            <header className='flex justify-between p-8 pb-0'>
                <h1 className='font-rowdies text-5xl'>MEMO<span className='text-red_1'>PRO</span></h1>
                <div className='flex gap-16'>
                    <button
                        onClick={() => { setOpenCreateNote(true) }}
                        className='font-semibold'>
                        Create <span className='text-red_1'>note</span>
                    </button>
                    <button className='font-semibold' onClick={async () => { await signOut({ callbackUrl: '/' }) }}>Logout</button>
                </div>
            </header>
            <main className='flex flex-wrap content-start gap-4 py-8 px-4 grow'>
                {noteQuery.isLoading ? <span className='loader'></span> :
                    <>
                        {noteQuery.data ? noteQuery.data.map(note => (
                            <NoteCard
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                authorId={note.authorId}
                                content={note.content}
                            />
                        )) : null}
                        <button
                            onClick={() => { setOpenCreateNote(true) }}
                            className='w-1/3-1rem h-56'>
                            +
                        </button>
                    </>}
                <CreateNoteModal isOpen={openCreateNote} setIsOpen={setOpenCreateNote} />
            </main>
        </div>
    );
}

export default Notes
