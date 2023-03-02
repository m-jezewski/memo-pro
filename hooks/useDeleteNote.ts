import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteNote = (noteId: string) => {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: async () => {
      await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/note/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId }),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return deleteNoteMutation;
};
