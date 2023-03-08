import Image from 'next/image';

import { CreateNoteButton } from '../createNoteButton/createNoteButton';
import { SortableNotelist } from '../sortableNoteList/sortableNoteList';

import { useGetNotes } from '@/hooks/useGetNotes';

export const NotesMainSection = () => {
  const noteQuery = useGetNotes();

  return (
    <main className="flex flex-wrap content-start gap-4 py-8 px-4 grow">
      {noteQuery.isLoading || noteQuery.data === null ? (
        <span className="loader"></span>
      ) : (
        <>
          <SortableNotelist queryData={noteQuery.data} />
          <CreateNoteButton
            className="h-56 grid items-center rounded-lg justify-center
              transition-all hover:backdrop-brightness-150 hover:backdrop-contrast-[0.9] 
              hover:backdrop-saturate-[1.15] w-full sm:w-1/2-1rem lg:w-1/3-1rem order-last"
          >
            <Image src="/add.svg" alt="Add new note" width={48} height={48} />
          </CreateNoteButton>
        </>
      )}
    </main>
  );
};
