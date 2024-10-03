import { cache } from "react";
import DBClient from "..";
import { User } from "next-auth";

export const fetchUserById = cache((id: string): Promise<User|null> => {
  return DBClient.getInstance().prisma.user.findFirst({
      where: { id: id}
    });
})