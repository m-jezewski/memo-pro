import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Note } from '@prisma/client';

export const useEditNote = (noteId: string, onFinished?: () => void, invalidate?: boolean) => {
  const queryClient = useQueryClient();

  const editNoteMutation = useMutation({
    mutationFn: async (changesObj: { readonly [Prop in keyof Note]+?: Note[Prop] }) => {
      await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/note/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...changesObj, id: noteId }),
      });
    },
    onSuccess: async () => {
      if (invalidate) await queryClient.invalidateQueries({ queryKey: ['notes'] });
      if (onFinished) onFinished();
    },
  });

  return editNoteMutation;
};
