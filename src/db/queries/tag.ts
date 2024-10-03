import type { Tag } from "@prisma/client";
import DBClient from "@/db";
import { cache } from "react";

export const fetchTags = cache(():Promise<Tag[]> => {
  return DBClient.getInstance().prisma.tag.findMany({})
})

export const fetchTagById = cache((id: string | null): Promise<Tag|null> => {
  return DBClient.getInstance().prisma.tag.findFirst({
      where: { id: id ?? ""}
    });
})