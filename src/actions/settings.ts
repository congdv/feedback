'use server';

import DBClient from '@/db';
import { currentUser } from '@/lib/auth';
import { SettingsSchema } from '@/schemas';
import * as z from 'zod';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }

  
  await DBClient.getInstance().prisma.user.update({
    where: { id: user.id },
    data: {
      ...values,
    },
  });

  return { success: 'Settings Updated!' };
};
