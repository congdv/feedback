import { fetchPosts } from '@/db/queries/post';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page');
  const pageSize = request.nextUrl.searchParams.get('pageSize');
  const tag = request.nextUrl.searchParams.get('selectTag');
  const status = request.nextUrl.searchParams.get('selectStatus');
  const filter = {
    tag,
    status,
  };
  const posts = await fetchPosts(Number(page), Number(pageSize), filter);
  return NextResponse.json({
    posts: posts,
  });
}
