import { getSession, signOut } from "next-auth/react";
import { useState } from "react";

import type { Note } from "@prisma/client";

import { CreateNoteModal } from "@/components/createNoteModal";
import { NoteCard } from "@/components/noteCard";
import { client } from "@/lib/prismadb";


interface NotesProps {
    readonly data: readonly Note[]
}

const Notes = ({ data }: NotesProps) => {

    const [openCreateNote, setOpenCreateNote] = useState(false)

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
            <main className='flex flex-wrap gap-4 p-8'>
                {data.map(note => (
                    <NoteCard
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        authorId={note.authorId}
                        content={note.content}
                    />
                ))}
                <button
                    onClick={() => { setOpenCreateNote(true) }}
                    className='w-1/3-1rem h-56'>
                    +
                </button>
                <CreateNoteModal isOpen={openCreateNote} setIsOpen={setOpenCreateNote} />
            </main>
        </div>
    );
}

export const getServerSideProps = async () => {
    const session = await getSession()
    const user = session?.user
    const notes = await client.note.findMany({ where: { authorId: user?.uid } })

    return {
        props: {
            data: notes
        }
    }
}

export default Notes
