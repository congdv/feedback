import type { Post } from "@prisma/client";
import DBClient from "@/db";
import { cache } from "react";

export type PostWithTagAndStatus = ( Post & { 
  status: { slug: string; description: string} | null, 
  tag: { slug: string ; description: string} | null,
  user: { name: string | null; image: string | null}
})

export const fetchPosts = cache((): Promise<PostWithTagAndStatus[]> => {
  return DBClient.getInstance().prisma.post.findMany({
    include: {
      tag: {
        select: {
          slug: true,
          description: true
        }
      },
      status: {
        select: {
          slug: true,
          description: true
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    },
    orderBy: {
      updatedAt: "desc"
    }
  })
})

export const fetchPostById = cache((id: string): Promise<PostWithTagAndStatus|null> => {
  return DBClient.getInstance().prisma.post.findFirst({
      where: { id: id},
      include: {
        tag: {
          select: {
            slug: true,
            description: true
          }
        },
        status: {
          select: {
            slug: true,
            description: true
          }
        },
        user: {
          select: {
            name: true,
            image: true
          }
        }
      },
    });
})