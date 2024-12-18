import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import DBClient from '@/db';
import authConfig from '@/auth.config';
import { getUserById } from './db/queries/user';

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  pages: {
    error: "/auth/error"
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if(session.user) {
        session.user.name = token.name
      }


      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      token.name = existingUser.name;
      return token;
    },
  },
  adapter: PrismaAdapter(DBClient.getInstance().prisma),

  session: { strategy: 'jwt' },
  ...authConfig,
});
