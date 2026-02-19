import { getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/lib/prismadb';
import { editNoteSchema } from '@/lib/validations/note';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user.uid) return res.status(401).end();

  const parsed = editNoteSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });

  const { id, title, content } = parsed.data;

  try {
    const note = await client.note.findUnique({ where: { id } });
    if (!note || note.authorId !== session.user.uid) return res.status(403).end();

    const updated = await client.note.update({
      where: { id },
      data: { title, content },
    });
    return res.status(200).json(updated);
  } catch {
    return res.status(500).json({ message: 'Something went wrong while updating your note' });
  }
}
