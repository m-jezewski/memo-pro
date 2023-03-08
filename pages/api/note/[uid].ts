import { getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]';

import type { Note } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse<readonly Note[]>) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method !== 'GET') {
    res.status(405).end();
  }

  if (session?.user.uid) {
    try {
      const notes = await client.note.findMany({ where: { authorId: session?.user.uid } });
      res.status(200).json(notes);
    } catch {
      res.statusMessage = 'Sorry!, Something went wrong while fetching your notes.';
      res.status(500).end();
    }
  } else {
    res.status(401).end();
  }
}
