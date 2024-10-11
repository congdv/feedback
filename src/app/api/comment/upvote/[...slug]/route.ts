import DBClient from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const commentId = pathname.split('/').pop(); 
  const body = await request.json();
  const userId = body.userId;

  if(commentId === null || commentId === undefined || userId === undefined || userId === null) {
    return;
  }

  const countReaction = await DBClient.getInstance().prisma.commentReaction.count({
    where: {
      commentId: commentId
    }
  })
  if(countReaction > 0) {
    await DBClient.getInstance().prisma.commentReaction.deleteMany({
      where: {
        userId: userId,
        commentId: commentId,
      }
    })
  } else {
    await DBClient.getInstance().prisma.commentReaction.create({
      data: {
        commentId: commentId,
        userId: userId
      }
    })
  }
  
  
  const count = await DBClient.getInstance().prisma.commentReaction.count({
    where: {
      commentId: commentId
    }
  })
  const commentDetail = await DBClient.getInstance().prisma.comment.findFirst({
    where: {
      id: commentId
    },
    include: {
      commentReaction: {
        select: {
          userId: true
        }
      }
    }
  })
  return NextResponse.json({
    count: count,
    reaction: commentDetail?.commentReaction
  });
}
