import { NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Resend from "next-auth/providers/resend"
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
    Resend({
      async sendVerificationRequest({
        identifier: email,
        url,
      }) {
        await sendVerificationRequestEmail({
          url,
          email: email,
        });
      },
    }),
   
  ],
} satisfies NextAuthConfig;
