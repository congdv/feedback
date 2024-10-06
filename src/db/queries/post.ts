import type { Post } from '@prisma/client';
import DBClient from '@/db';
import { cache } from 'react';

export type PostWithTagAndStatus = Post & {
  status: { slug: string; description: string } | null;
  tag: { slug: string; description: string } | null;
  user: { name: string | null; image: string | null };
};

type FetchFilter = {
  tag: string | null;
  status: string | null;
};

export const fetchPosts = cache(
  (
    page: number,
    pageSize: number,
    filter: FetchFilter
  ): Promise<PostWithTagAndStatus[]> => {
    return DBClient.getInstance().prisma.post.findMany({
      where: {
        ...(filter.status && { statusId: filter.status }),
        ...(filter.tag && { tagId: filter.tag }),
      },
      include: {
        tag: {
          select: {
            slug: true,
            description: true,
          },
        },
        status: {
          select: {
            slug: true,
            description: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }
);

export const fetchPostById = cache(
  (id: string): Promise<PostWithTagAndStatus | null> => {
    return DBClient.getInstance().prisma.post.findFirst({
      where: { id: id },
      include: {
        tag: {
          select: {
            slug: true,
            description: true,
          },
        },
        status: {
          select: {
            slug: true,
            description: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  }
);

export const getUpvoteCount = (postId: string | null) => {
  if (postId === null) {
    return new Promise((resolve) => resolve(0));
  }
  return DBClient.getInstance().prisma.postReaction.count({
    where: {
      postId: postId,
    },
  });
};
