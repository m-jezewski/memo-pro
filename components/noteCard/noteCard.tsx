import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { useState } from 'react';

import { NoteModal } from '../noteModal/noteModal';

import type { Note } from '@prisma/client';
import type { KeyboardEvent } from 'react';

import { useDeleteNoteMutation } from '@/hooks/useDeleteNoteMutation';

export const NoteCard = ({ note }: { readonly note: Note }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteNoteMutation = useDeleteNoteMutation(note.id);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: note.id });
  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (deleteNoteMutation.isLoading) {
    return (
      <div className="rounded-lg p-4 h-[220px] w-full sm:w-1/2-1rem lg:w-1/3-1rem flex">
        <span className="loader" />
      </div>
    );
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={styles}
        {...attributes}
        {...listeners}
        className="flex flex-col bg-light_blue_transparent gap-2 rounded-lg p-4 h-[224px]
                transition-colors cursor-pointer hover:brightness-[1.15] over:saturate-[1.15] w-full sm:w-1/2-1rem lg:w-1/3-1rem"
        tabIndex={0}
        aria-label={`Click to view entire content or edit ${note.title} note`}
        onClick={() => {
          setIsModalOpen(true);
        }}
        onKeyDown={handleKeyDown}
      >
        <header className="flex justify-between items-start gap-1">
          <h3 className="uppercase font-medium break-words w-full-2rem">{note.title}</h3>
          <button
            className="min-w-[24px]"
            onClick={() => {
              deleteNoteMutation.mutate();
            }}
          >
            <Image src={'/delete.svg'} alt="Remove note" width={24} height={24} />
          </button>
        </header>
        <p className="grow text-sm line-clamp-[8] break-words whitespace-pre-wrap">{note.content}</p>
      </div>
      <NoteModal note={note} isOpen={isModalOpen} setIsOpen={setIsModalOpen} deleteMutation={deleteNoteMutation} />
    </>
  );
};
