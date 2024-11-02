'use server';
import DBClient from '@/db';
import { fetchPostById } from '@/db/queries/post';
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

  const existingOrganization = await DBClient.getInstance().prisma.organization.findFirst({
    where: {
      id: values.organizationId
    }
  })
  if(!existingOrganization) {
    return {
      error: "Current organization is not valid"
    }
  }

  const savedPost = await DBClient.getInstance().prisma.post.create({
    data: {
      ...values,
      userId: user?.id,
    },
  });
  redirect(paths.postShow(existingOrganization.slug, savedPost.id));

};

export const updatePost = async (values: z.infer<typeof PostSchema>) => {
  const user = await currentUser();
  const postId = values.postId;


  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }
  if(!postId) {
    return { error: "Invalid post id"}
  }
  const validatedFields = PostSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    };
  }

  const existingOrganization = await DBClient.getInstance().prisma.organization.findFirst({
    where: {
      id: values.organizationId
    }
  })
  if(!existingOrganization) {
    return {
      error: "Current organization is not valid"
    }
  }


  values.postId = undefined;

  await DBClient.getInstance().prisma.post.update({
    where: {
      id: postId
    },
    data: {
      ...values,
      userId: user?.id,
    },
  });
  redirect(paths.postShow(existingOrganization.slug, postId));

};

export const getPostById = async(id: string) => {
  return fetchPostById(id);
}