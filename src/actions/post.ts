'use server';
import DBClient from '@/db';
import { currentUser } from '@/lib/auth';
import paths from '@/paths';
import { PostSchema } from '@/schemas';
import { redirect } from 'next/navigation';
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

  const savedPost = await DBClient.getInstance().prisma.post.create({
    data: {
      ...values,
      userId: user?.id,
    },
  });
  redirect(paths.postShow(savedPost.id));

};
