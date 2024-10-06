import type { Comment } from '@prisma/client';
import { cache } from 'react';
import DBClient from '..';
import { auth } from '@/auth';

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

export type Reaction = {
  reaction: 'LIKE' | 'DISLIKE';
  _count: number;
};

export const fetchCommentsByPostId = cache(
  (postId: string): Promise<CommentWithAuthor[]> => {
    return DBClient.getInstance().prisma.comment.findMany({
      where: { postId: postId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'asc',
      },
    });
  }
);

export const countReactionByCommentId = (commentId: string): Promise<any> => {
  return DBClient.getInstance().prisma.commentReaction.groupBy({
    by: ['reaction'],
    where: {
      commentId: commentId,
    },
    _count: true,
  });
};

export const currentUserReactToComment = async (commentId: string) => {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }

  const reaction =
    await DBClient.getInstance().prisma.commentReaction.findFirst({
      where: {
        userId: session.user.id,
        commentId: commentId,
      },
      select: {
        reaction: true,
      },
    });
  return reaction;
};
