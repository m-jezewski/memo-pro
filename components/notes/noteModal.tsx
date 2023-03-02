import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Modal } from '../modal';

import { NoteForm } from './noteForm';

import type { Note } from '@prisma/client';
import type { UseMutationResult } from '@tanstack/react-query';
import type { Dispatch, SetStateAction } from 'react';

import { useEditNote } from '@/hooks/useEditNote';

interface NoteModalProps {
  readonly note: Note;
  readonly isOpen: boolean;
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
  readonly deleteMutation: UseMutationResult<void, unknown, void, unknown>;
}

export const NoteModal = ({ note, isOpen, setIsOpen, deleteMutation }: NoteModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const editNoteMutation = useEditNote(
    note.id,
    () => {
      setIsEditing(false);
    },
    true,
  );

  const handleDelete = () => {
    deleteMutation.mutate();
    setIsOpen(false);
  };

  useEffect(() => {
    setIsEditing(false);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={note.title || ''}>
      {isEditing ? (
        <NoteForm
          mutation={editNoteMutation}
          initialValues={{
            title: note.title || '',
            content: note.content || '',
          }}
          btnMessageIdle="Save"
          btnMessageSubmitting="Saving changes..."
        />
      ) : (
        <>
          <p className="break-words whitespace-pre-wrap max-w-full md:max-w-xs">{note.content}</p>
          <div className="flex justify-around w-full">
            <button
              onClick={() => {
                setIsEditing(true);
              }}
              className="rounded-full p-2 transition-all hover:bg-light_blue_1"
            >
              <Image src="/edit.svg" width={32} height={32} alt="Edit note" />
            </button>
            <button onClick={handleDelete} className="rounded-full p-2 transition-all hover:bg-red-900">
              <Image src="/delete.svg" width={32} height={32} alt="Remove note" />
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};
