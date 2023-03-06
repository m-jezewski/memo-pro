import { Modal } from '../modal';

import { NoteForm } from './noteForm';

import type { createMutationValues } from 'interfaces';
import type { Dispatch, SetStateAction } from 'react';

import { useCreateNote } from '@/hooks/useCreateNote';

interface CreateNoteModalProps {
  readonly isOpen: boolean;
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateNoteModal = ({ isOpen, setIsOpen }: CreateNoteModalProps) => {
  const createNoteMutation = useCreateNote(() => {
    setIsOpen(false);
  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="New note" overlay={true}>
      <NoteForm<createMutationValues>
        initialValues={{ title: '', content: '' }}
        mutation={createNoteMutation}
        btnMessageIdle="Add new note"
        btnMessageSubmitting="Creating new note..."
      />
    </Modal>
  );
};
