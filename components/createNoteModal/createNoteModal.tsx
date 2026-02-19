import { Modal } from '../modal/modal';
import { NoteForm } from '../noteForm/noteForm';

import type { NoteFormValues } from '@/lib/validations/note';
import type { Dispatch, SetStateAction } from 'react';

import { useCreateNoteMutation } from '@/hooks/useCreateNoteMutation';

interface CreateNoteModalProps {
  readonly isOpen: boolean;
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateNoteModal = ({ isOpen, setIsOpen }: CreateNoteModalProps) => {
  const createNoteMutation = useCreateNoteMutation();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="New note" overlay={true}>
      <NoteForm<NoteFormValues>
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
