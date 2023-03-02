import type { Note } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/lib/prismadb';

interface reqBody {
  readonly uid: string;
  readonly title: string;
  readonly content: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Note>) {
  const { uid, title, content }: reqBody = req.body;

  if (req.method === 'POST') {
    try {
      const author = await client.user.findUnique({ where: { id: uid } });
      if (!author) throw new Error('User not found');
      const note = await client.note.create({
        data: {
          title: title,
          content: content,
          authorId: author.id,
        },
      });
      res.status(200).json(note);
    } catch {
      res.statusMessage = 'Sorry!, Something went wrong while creating your note.';
      res.status(500).end();
    }
  } else {
    res.status(405).end();
  }
}
