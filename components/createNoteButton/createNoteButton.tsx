import { useState } from 'react';

import { CreateNoteModal } from '../createNoteModal/createNoteModal';

import type { ReactNode } from 'react';

interface CreateNoteButtonProps {
  readonly children: ReactNode;
  readonly className: string;
}

export const CreateNoteButton = ({ children, className }: CreateNoteButtonProps) => {
  const [openCreateNote, setOpenCreateNote] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setOpenCreateNote(true);
        }}
        className={className}
      >
        {children}
      </button>
      <CreateNoteModal isOpen={openCreateNote} setIsOpen={setOpenCreateNote} />
    </>
  );
};
