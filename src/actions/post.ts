'use server';
import DBClient from '@/db';
import { currentUser } from '@/lib/auth';
import { PostSchema } from '@/schemas';
import * as z from 'zod';

export const newPost = async (values: z.infer<typeof PostSchema>) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }
  const validatedFields = PostSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    };
  }

  await DBClient.getInstance().prisma.post.create({
    data: {
      ...values,
      userId: user?.id,
    },
  });

  return { success: 'Created new post!' };
};
