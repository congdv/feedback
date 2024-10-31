'use server';

import type { Post } from '@prisma/client';
import { auth } from '@/auth';
import { z } from 'zod';
import DBClient from '@/db';
import { redirect } from 'next/navigation';
import paths from '@/paths';

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export async function createNewPost(
  title: string,
  content: string,
  tagId: string | undefined,
  statusId: string | undefined,
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: title,
    content: content,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  let post: Post;
  try {
    post = await DBClient.getInstance().prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        tagId: tagId,
        statusId: statusId,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Failed to create post'],
        },
      };
    }
  }
  redirect(paths.postShow(post.id));
}

export async function updatePost(
  title: string,
  content: string,
  postId: string | undefined,
  tagId: string | undefined,
  statusId: string | undefined,
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: title,
    content: content,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  let post: Post;
  try {
    post = await DBClient.getInstance().prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: result.data.title,
        content: result.data.content,
        tagId: tagId,
        statusId: statusId,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Failed to create post'],
        },
      };
    }
  }
  redirect(paths.postShow(post.id));
}
