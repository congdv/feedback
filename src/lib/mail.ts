import MagicLinkEmail from '@/components/emails/magic-link';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationRequestEmail= async (params: {
  email: string;
  url: string;
}) => {
  const { url, email } = params;
  const emailTemplate = MagicLinkEmail({url})
  await resend.emails.send({
    from: 'Cong Dao <cong@congdv.com>',
    to: email,
    subject: 'Welcome to Feedback!',
    react: emailTemplate
  });
};
