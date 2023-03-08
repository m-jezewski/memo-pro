import { getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]';

import type { Note } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/lib/prismadb';

interface reqBody {
  readonly title: string;
  readonly content: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Note>) {
  const { title, content }: reqBody = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (req.method !== 'POST') {
    res.status(405).end();
  }

  if (session?.user.uid) {
    try {
      const author = await client.user.findUnique({ where: { id: session.user.uid } });
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
    res.status(401).end();
  }
}
