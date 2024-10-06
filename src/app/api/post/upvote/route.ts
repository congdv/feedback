import { getUpvoteCount } from '@/db/queries/post';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const postId = request.nextUrl.searchParams.get('postId');

  const count = await getUpvoteCount(postId);
  console.log('🚀 ~ GET ~ count:', count);
  return NextResponse.json({
    count: count,
  });
}
