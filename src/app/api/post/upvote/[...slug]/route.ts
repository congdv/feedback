import DBClient from '@/db';
import { fetchPostById, getUpvoteCount, getUpvoteCountByUserId } from '@/db/queries/post';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const postId = pathname.split('/').pop(); 
  const count = await getUpvoteCount(postId);
  const userId = request.nextUrl.searchParams.get('userId');
  let byUser = false;
  if(userId) {
    const countByUser = await getUpvoteCountByUserId(postId, userId);
    byUser = countByUser > 0 ? true: false;
  }
  return NextResponse.json({
    count: count,
    byUser: byUser
  });
}



export async function POST(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const postId = pathname.split('/').pop(); 
  const body = await request.json();
  const userId = body.userId;

  if(postId === null || postId === undefined || userId === undefined || userId === null) {
    return;
  }

  const countByUser = await getUpvoteCountByUserId(postId,userId );
  if(countByUser > 0) {
    await DBClient.getInstance().prisma.postReaction.deleteMany({
      where: {
        userId: userId,
        postId: postId,
      }
    })
  } else {
    await DBClient.getInstance().prisma.postReaction.create({
      data: {
        postId: postId,
        userId: userId
      }
    })
  }
  
  
  const count = await getUpvoteCount(postId);
  const post = await fetchPostById(postId);
  return NextResponse.json({
    count: count,
    reaction: post?.postReaction ?? []
  });
}
