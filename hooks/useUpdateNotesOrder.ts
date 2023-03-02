import { useMutation } from '@tanstack/react-query';

import type { Note } from '@prisma/client';

export const useUpdateNotes = () => {
  const updateNotesMutation = useMutation({
    mutationFn: async (updatedNotes: readonly Note[]) => {
      await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/note/updateOrder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNotes),
      });
    },
    onSuccess(data) {
      console.log(data);
    },
  });

  return updateNotesMutation;
};
