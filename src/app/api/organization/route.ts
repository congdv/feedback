import DBClient from "@/db";
import { currentUser } from "@/lib/auth";
import {NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  if(!user || !user.id) {
    return new NextResponse("Unauthorized", {status: 403})
  }
  const organizations = await DBClient.getInstance().prisma.organization.findMany({
    where: {
      createdByUserId: user.id
    }
  });
  return NextResponse.json(organizations);
}
