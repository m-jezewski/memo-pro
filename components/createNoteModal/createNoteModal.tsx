import { Modal } from '../modal/modal';
import { NoteForm } from '../noteForm/noteForm';

import type { createMutationValues } from 'interfaces';
import type { Dispatch, SetStateAction } from 'react';

import { useCreateNote } from '@/hooks/useCreateNote';

interface CreateNoteModalProps {
  readonly isOpen: boolean;
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateNoteModal = ({ isOpen, setIsOpen }: CreateNoteModalProps) => {
  const createNoteMutation = useCreateNote();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="New note" overlay={true}>
      <NoteForm<createMutationValues>
        initialValues={{ title: '', content: '' }}
        mutation={createNoteMutation}
        mutationOnSuccess={() => {
          setIsOpen(false);
        }}
        btnMessageIdle="Add new note"
        btnMessageSubmitting="Creating new note..."
      />
    </Modal>
  );
};
