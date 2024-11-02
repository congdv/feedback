import type { Post, Status } from "@prisma/client";
import DBClient from "@/db";
import { fetchStatus } from "./status";

export type PostWithTagAndStatus = Post & {
  status: { slug: string; description: string } | null;
  tag: { slug: string; description: string } | null;
  user: { name: string | null; image: string | null };
};

export type PostWithTagStatusAndReaction = PostWithTagAndStatus & {
  postReaction: Array<{ userId: string }>;
};
export type PostByGroup = Status & {
  posts: PostWithTagStatusAndReaction[];
};

type FetchFilter = {
  tag: string | null;
  status: string | null;
};

export const fetchPosts = (
  page: number,
  pageSize: number,
  filter: FetchFilter
): Promise<PostWithTagStatusAndReaction[]> => {
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
      postReaction: {
        select: {
          userId: true,
        },
      },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const fetchPostById = (
  id: string
): Promise<PostWithTagStatusAndReaction | null> => {
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
      postReaction: {
        select: {
          userId: true,
        },
      },
    },
  });
};

export const getUpvoteCount = (postId?: string): Promise<number> => {
  if (postId === null || postId === undefined) {
    return new Promise((resolve) => resolve(0));
  }
  return DBClient.getInstance().prisma.postReaction.count({
    where: {
      postId: postId,
    },
  });
};

export const getUpvoteCountByUserId = (
  postId?: string,
  userId?: string
): Promise<number> => {
  if (
    postId === null ||
    postId === undefined ||
    userId === undefined ||
    userId === null
  ) {
    return new Promise((resolve) => resolve(0));
  }
  return DBClient.getInstance().prisma.postReaction.count({
    where: {
      postId: postId,
      userId: userId,
    },
  });
};

export const fetchPostsByGroup = async () => {
  const statusList = await fetchStatus();
  const res = [];
  for (const status of statusList) {
    const st = { ...status } as PostByGroup;
    const posts = await fetchPosts(1, 20, { status: status.id, tag: null });
    st.posts = posts;
    res.push(st);
  }

  return res;
};

export const fetchPostsByOrganizationId = (
  page: number,
  pageSize: number,
  organizationId: string,
  filter: FetchFilter
): Promise<PostWithTagStatusAndReaction[]> => {
  return DBClient.getInstance().prisma.post.findMany({
    where: {
      ...(filter.status && { statusId: filter.status }),
      ...(filter.tag && { tagId: filter.tag }),
      organizationId: organizationId
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
      postReaction: {
        select: {
          userId: true,
        },
      },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      updatedAt: "desc",
    },
  });
};
