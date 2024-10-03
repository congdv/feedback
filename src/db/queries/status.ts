import type { Status } from "@prisma/client";
import DBClient from "@/db";
import { cache } from "react";

export const fetchStatus = (): Promise<Status[]> => {
  return DBClient.getInstance().prisma.status.findMany({})
}

export const fetchStatusById = cache((id: string | null): Promise<Status|null> => {
  return DBClient.getInstance().prisma.status.findFirst({
      where: { id: id ?? ""}
    });
})