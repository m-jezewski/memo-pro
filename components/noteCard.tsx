import type { Note } from "@prisma/client";

export const NoteCard = ({ content, title }: Note) => {
    return (
        <div className='bg-light_blue_transparent rounded-lg p-4 h-56'>
            <header className='flex justify-between my-1'>
                <h4 className='uppercase font-medium'>{title}</h4>
                <div className='flex gap-4'>
                    <button>E</button>
                    <button>X</button>
                </div>
            </header>
            <p className='text-sm'>
                {content}
            </p>
        </div>
    );
}
