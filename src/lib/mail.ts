import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationRequestEmail= async (params: {
  email: string;
  url: string;
}) => {
  const { url, email } = params;
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: '2FA Code',
    html: `<p>Click on this <a href="${url}">link </a> </p>`,
  });
};
