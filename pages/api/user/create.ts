import { Prisma } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';

import { hashPassword } from '@/lib/brypt';
import { client } from '@/lib/prismadb';
import { registerSchema } from '@/lib/validations/auth';
import initialNotes from '@/data/initialContent.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  const { email, password } = parsed.data;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await client.user.create({
      data: {
        email,
        password: hashedPassword,
        notes: {
          create: initialNotes,
        },
      },
      select: { id: true, email: true, name: true },
    });
    return res.status(201).json(user);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return res.status(409).json({ message: 'User with this email already exists' });
    }
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
