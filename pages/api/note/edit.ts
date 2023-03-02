import type { Note } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/lib/prismadb';

interface reqBody {
  readonly id: string;
  readonly title: string;
  readonly content: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Note>) {
  const { id, title, content }: reqBody = req.body;

  if (req.method === 'PUT') {
    try {
      const note = await client.note.update({
        where: { id: id },
        data: {
          title: title,
          content: content,
        },
      });
      res.status(200).json(note);
    } catch {
      res.statusMessage = 'Sorry!, Something went wrong while updating your note.';
      res.status(500).end();
    }
  } else {
    res.status(405).end();
  }
}
