import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import type { Note } from "@prisma/client";


export const NoteCard = ({ content, title, id }: Note) => {
    const session = useSession()
    const router = useRouter()

    const handleDelete = async () => {
        await fetch('http://localhost:3000/api/note/delete', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ noteId: id, uid: session.data?.user.uid })
        })
        await router.replace(router.asPath);
    }

    return (
        <div
            className='flex flex-col bg-light_blue_transparent gap-1 rounded-lg p-4 h-[220px] transition-all cursor-pointer hover:brightness-[1.15] hover:saturate-[1.15] w-1/3-1rem'
            tabIndex={0}
            onClick={() => { console.log('show note') }}
        >
            <header className='flex justify-between'>
                <h4 className='uppercase font-medium'>{title}</h4>
                <div className='flex gap-4'>
                    <button>E</button>
                    <button onClick={handleDelete}>X</button>
                </div>
            </header>
            <p className='grow text-sm line-clamp-[8] break-words'>
                {content}
            </p>
        </div>
    );
}
