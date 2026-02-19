import { getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/lib/prismadb';
import { updateOrderSchema } from '@/lib/validations/note';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user.uid) return res.status(401).end();

  const parsed = updateOrderSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });

  const updatedArr = parsed.data;

  try {
    const noteIds = updatedArr.map((n) => n.id);
    const notes = await client.note.findMany({
      where: { id: { in: [...noteIds] }, authorId: session.user.uid },
      select: { id: true },
    });

    if (notes.length !== updatedArr.length) return res.status(403).end();

    const operations = updatedArr.map((note) =>
      client.note.update({
        where: { id: note.id },
        data: { orderIndex: note.orderIndex },
      }),
    );
    await client.$transaction(operations);
    return res.status(200).end();
  } catch {
    return res.status(500).json({ message: 'Something went wrong while reordering notes' });
  }
}
