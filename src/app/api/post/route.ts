import {
  fetchPostsByOrganizationId,
} from "@/db/queries/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const pageSize = request.nextUrl.searchParams.get("pageSize");
  const tag = request.nextUrl.searchParams.get("selectTag");
  const status = request.nextUrl.searchParams.get("selectStatus");
  const organizationId = request.nextUrl.searchParams.get("organizationId");
  if (!organizationId) {
    return new NextResponse(null, { status: 403 });
  }

  const filter = {
    tag,
    status,
  };

  const posts = await fetchPostsByOrganizationId(
    Number(page),
    Number(pageSize),
    organizationId,
    filter
  );
  return NextResponse.json({
    posts: posts,
  });
}
