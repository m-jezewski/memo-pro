import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import type { Note } from '@prisma/client';

export const useGetNotes = () => {
  const session = useSession();
  const uid = session.data?.user.uid;

  return useQuery({
    queryKey: ['notes', uid],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/note/${uid}`);
      const data: readonly Note[] = await res.json();
      return [...data].sort((a, b) => a.orderIndex - b.orderIndex);
    },
    enabled: !!uid,
  });
};
