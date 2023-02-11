import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

const prisma = new PrismaClient()

export default NextAuth({
    debug: true,
    adapter: PrismaAdapter(prisma),
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
    pages:{
        signIn: '/'
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "email", type: 'email'},
                password: { label: 'password', type: 'password'}
            },
            async authorize(credentials) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials?.email,
                        password: credentials?.password 
                    }           
                })
                if(user) return user

                return null
            },
        })
    ],
})