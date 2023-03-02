import type { Note } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse<readonly Note[]>) {
  const { uid } = req.query;

  if (req.method === 'GET') {
    try {
      if (!uid) throw new Error();
      const notes = await client.note.findMany({ where: { authorId: String(uid) } });
      res.status(200).json(notes);
    } catch {
      res.statusMessage = 'Sorry!, Something went wrong while fetching your notes.';
      res.status(500).end();
    }
  } else {
    res.status(405).end();
  }
}
