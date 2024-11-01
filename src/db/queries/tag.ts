import type { Tag } from "@prisma/client";
import DBClient from "@/db";

export const fetchTags = ():Promise<Tag[]> => {
  return DBClient.getInstance().prisma.tag.findMany({})
}

export const fetchTagById = (id: string | null): Promise<Tag|null> => {
  return DBClient.getInstance().prisma.tag.findFirst({
      where: { id: id ?? ""}
    });
}