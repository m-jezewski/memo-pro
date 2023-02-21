/* eslint-disable @typescript-eslint/consistent-type-assertions -- noteId -> UniqueIdentifier */
import { KeyboardSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { useUpdateNotes } from "./useUpdateNotesOrder";

import type { DragEndEvent, UniqueIdentifier} from "@dnd-kit/core";
import type { Note } from "@prisma/client";
import type { Dispatch, SetStateAction} from "react";

export const useDnd = (setNotes: Dispatch<SetStateAction<readonly Note[]>>) => {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        },
    });

    const sensors = useSensors(
        mouseSensor,
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const updateOrdersMutation = useUpdateNotes()

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return
        if (active.id !== over.id) {
            setNotes((notes) => {
                const oldIndex = notes.map(note => note.id as UniqueIdentifier).indexOf(active.id)
                const newIndex = notes.map(note => note.id as UniqueIdentifier).indexOf(over.id)
                const newNotes = arrayMove(notes, oldIndex, newIndex)
                const result = newNotes.map((note, index) => {
                    return {
                        ...note,
                        orderIndex: index
                    }
                }).sort((a, b) => a.orderIndex - b.orderIndex)
                updateOrdersMutation.mutate(result)
                return result;
            })
        }
    }

    return { handleDragEnd, sensors }
}