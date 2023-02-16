import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import type { Note } from "@prisma/client";

import { CreateNoteModal } from "@/components/createNoteModal/createNoteModal";
import { NoteCard } from "@/components/noteCard/noteCard";



const Notes = () => {
    const [openCreateNote, setOpenCreateNote] = useState(false)
    const session = useSession()

    const noteQuery = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/api/note/${session.data?.user.uid}`)
            const data: readonly Note[] = await res.json()
            return data
        }
    })

    console.log(session, session.data?.user.uid)

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
                            className='w-1/3-1rem h-56  grid items-center rounded-lg justify-center transition-all 
                            hover:backdrop-brightness-150 hover:backdrop-contrast-[0.9] hover:backdrop-saturate-[1.15]'>
                            <Image src='/add.svg' alt='Add new note' width={48} height={48} />
                        </button>
                    </>}
                <CreateNoteModal isOpen={openCreateNote} setIsOpen={setOpenCreateNote} />
            </main>
        </div>
    );
}

export default Notes
