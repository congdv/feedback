import DBClient from '@/db';


export const getOrganizationByName = async (name: string) => {
  try {
    const user = await DBClient.getInstance().prisma.organization.findUnique({
      where: { slug:  name},
    });
    return user;
  } catch {
    return null;
  }
};
