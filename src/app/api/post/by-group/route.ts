import { fetchPostsByGroup } from '@/db/queries/post';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetchPostsByGroup()

  return NextResponse.json(res);
}
