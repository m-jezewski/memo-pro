import { getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/lib/prismadb';
import { deleteNoteSchema } from '@/lib/validations/note';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user.uid) return res.status(401).end();

  const parsed = deleteNoteSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });

  const { noteId } = parsed.data;

  try {
    const note = await client.note.findUnique({ where: { id: noteId } });
    if (!note || note.authorId !== session.user.uid) return res.status(403).end();

    await client.note.delete({ where: { id: noteId } });
    return res.status(200).end();
  } catch {
    return res.status(500).json({ message: 'Something went wrong while deleting your note' });
  }
}
