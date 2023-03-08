import { signOut } from 'next-auth/react';

import { CreateNoteButton } from '../createNoteButton/createNoteButton';

export const Header = () => {
  return (
    <header className="flex justify-between p-8 pb-0 gap-y-4 flex-col sm:flex-row">
      <h1 className="font-rowdies text-2xl md:text-5xl mx-auto sm:mx-0">
        MEMO<span className="text-red_1">PRO</span>
      </h1>
      <div className="flex gap-16 justify-center">
        <CreateNoteButton className="font-semibold">
          Create <span className="text-red_1">note</span>
        </CreateNoteButton>
        <button
          className="font-semibold"
          onClick={async () => {
            await signOut({ callbackUrl: '/' });
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};
