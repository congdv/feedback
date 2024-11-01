import DBClient from '..';
import { User } from 'next-auth';

export const fetchUserById = (id: string): Promise<User | null> => {
  return DBClient.getInstance().prisma.user.findFirst({
    where: { id: id },
  });
};

export const getUserById = async (id: string) => {
  try {
    const user = await DBClient.getInstance().prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch {
    return null;
  }
};
