import { NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { sendVerificationRequestEmail } from './lib/mail';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    {
      id: "http-email",
      name: "Email",
      type: "email",
      async sendVerificationRequest({ identifier, url }) {
        await sendVerificationRequestEmail({
          url,
          email: identifier,
        });
      },
    },
  ],
} satisfies NextAuthConfig;
