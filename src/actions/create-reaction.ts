import { auth } from "@/auth";
import DBClient from "@/db";
import type { Reaction } from '@prisma/client';


export async function createReaction(commentId: string, reaction: Reaction) {

  const session = await auth();

  if (!session || !session.user) {
    return
  }

  await DBClient.getInstance().prisma.commentReaction.upsert({
    where: {
      userId_commentId: {
        userId: session?.user?.id,
        commentId: commentId 
      }
    },
    update: {
      reaction: reaction
    },
    create: {
      userId: session?.user?.id,
      commentId: commentId,
      reaction: reaction
    }
  })
}