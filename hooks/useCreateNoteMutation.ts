import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { NoteFormValues } from '@/lib/validations/note';

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: async ({ title, content }: NoteFormValues) => {
      await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/note/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, content: content }),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return createNoteMutation;
};
