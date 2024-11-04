import DBClient from "@/db";
import { currentUser } from "@/lib/auth";
import {NextResponse } from "next/server";

export async function GET(_request: any, { params }: { params: {slug: string}}) {
  const user = await currentUser();
  if(!user || !user.id || !params.slug) {
    return NextResponse.json({isOwner: false});
  }
  const organizations = await DBClient.getInstance().prisma.organization.findFirst({
    where: {
      id: params.slug,
      createdByUserId: user.id
    }
  })
  if(!organizations) {
    return NextResponse.json({isOwner: false});
  }
  return NextResponse.json({isOwner: true});
}
