import { MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { useUpdateNotesOrderMutation } from '@/hooks/useUpdateNotesOrderMutation';

import type { DragEndEvent } from '@dnd-kit/core';
import type { Note } from '@prisma/client';
import type { Dispatch, SetStateAction } from 'react';

export const useDnd = (setNotes: Dispatch<SetStateAction<readonly Note[]>>) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(mouseSensor);
  const updateOrdersMutation = useUpdateNotesOrderMutation();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setNotes((notes) => {
        const oldIndex = notes.map((note) => note.id).indexOf(String(active.id));
        const newIndex = notes.map((note) => note.id).indexOf(String(over.id));
        const newNotes = arrayMove(notes, oldIndex, newIndex);
        const result = newNotes
          .map((note, index) => ({
            ...note,
            orderIndex: index,
          }))
          .sort((a, b) => a.orderIndex - b.orderIndex);
        updateOrdersMutation.mutate(result);
        return result;
      });
    }
  }

  return { handleDragEnd, sensors };
};
