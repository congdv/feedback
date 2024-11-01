import type { Status } from "@prisma/client";
import DBClient from "@/db";

export const fetchStatus = (): Promise<Status[]> => {
  return DBClient.getInstance().prisma.status.findMany({})
}

export const fetchStatusById = (id: string | null): Promise<Status|null> => {
  return DBClient.getInstance().prisma.status.findFirst({
      where: { id: id ?? ""}
    });
}