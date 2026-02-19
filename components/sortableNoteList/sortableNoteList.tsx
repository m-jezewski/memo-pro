import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

import { NoteCard } from '../noteCard/noteCard';

import type { Note } from '@prisma/client';

import { useDnd } from '@/hooks/useDnd';

interface SortableNoteListProps {
  readonly queryData: readonly Note[] | undefined;
}

export const SortableNotelist = ({ queryData }: SortableNoteListProps) => {
  const [notes, setNotes] = useState<readonly Note[]>(queryData || []);
  const { sensors, handleDragEnd } = useDnd(setNotes);

  useEffect(() => {
    if (queryData) setNotes(queryData); // necessary for dnd animation to function properly
  }, [queryData]);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={[...notes]}>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </SortableContext>
    </DndContext>
  );
};
