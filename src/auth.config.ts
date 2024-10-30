import { NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import EmailProvider from "next-auth/providers/email";
import { sendVerificationRequestEmail } from './lib/mail';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
          await sendVerificationRequestEmail({
            url,
            email: identifier,
          });
      },
    }),
  ],
} satisfies NextAuthConfig;
