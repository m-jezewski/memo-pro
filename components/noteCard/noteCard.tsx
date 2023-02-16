import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

import type { Note } from "@prisma/client";


export const NoteCard = ({ content, title, id, authorId }: Note) => {
    const queryClient = useQueryClient()

    const deleteNoteMutation = useMutation({
        mutationFn: async () => {
            await fetch('http://localhost:3000/api/note/delete', {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ noteId: id })
            })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['notes'] })
        },
    })

    if (deleteNoteMutation.isLoading) {
        return (
            <div className='rounded-lg p-4 h-[220px] w-1/3-1rem flex'>
                <span className='loader' />
            </div>)
    }

    return (
        <div
            className='flex flex-col bg-light_blue_transparent gap-1 rounded-lg p-4 h-[220px]
            transition-all cursor-pointer hover:brightness-[1.15] hover:saturate-[1.15] w-full sm:w-1/2-1rem lg:w-1/3-1rem'
            tabIndex={0}
            onClick={() => { console.log('show note') }}
        >
            <header className='flex justify-between'>
                <h4 className='uppercase font-medium'>{title}</h4>
                <div className='flex gap-4'>
                    <button onClick={() => { deleteNoteMutation.mutate() }}>
                        <Image src={'/delete.svg'} alt='Remove note' width={24} height={24} />
                    </button>
                </div>
            </header>
            <p className='grow text-sm line-clamp-[8] break-words whitespace-pre-line'>
                {content}
            </p>
        </div>
    )
}
