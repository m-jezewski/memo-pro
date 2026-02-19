import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { NoteFormValues } from '@/lib/validations/note';

export const useEditNote = (noteId: string, invalidate?: boolean) => {
  const queryClient = useQueryClient();

  const editNoteMutation = useMutation({
    mutationFn: async (changesObj: NoteFormValues) => {
      await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/note/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...changesObj, id: noteId }),
      });
    },
    onSuccess: async () => {
      if (invalidate) await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return editNoteMutation;
};
