import type { Comment } from '@prisma/client';
import DBClient from '..';

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
  commentReaction: Array<{userId: string}>;
};


export const fetchCommentsByPostId = 
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
        commentReaction: {
          select: {
            userId: true
          }
        }
      },
      orderBy: {
        updatedAt: 'asc',
      },
    });
  }

