/* eslint-disable @typescript-eslint/require-await -- callbacks */
/* eslint-disable require-await -- callbacks*/
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import type { NextAuthOptions } from 'next-auth';

import { verifyPassword } from '@/lib/brypt';
import { client } from '@/lib/prismadb';
import { loginSchema } from '@/lib/validations/auth';

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(client),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.uid = token.sub || '';
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await client.user.findFirst({
          where: { email: email },
          select: { id: true, email: true, name: true, password: true }
        });

        if (!user?.password) return null;

        const valid = await verifyPassword(password, user.password);
        if (!valid) return null;

        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
