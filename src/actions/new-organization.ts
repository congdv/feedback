'use server';

import DBClient from '@/db';
import { getOrganizationByName } from '@/db/queries/organization';
import { currentUser } from '@/lib/auth';
import { OrganizationSchema } from '@/schemas';
import * as z from 'zod';

export const newOrganization = async (values: z.infer<typeof OrganizationSchema>) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }

  const existingOrganization = await getOrganizationByName(values.name);
  if(existingOrganization) {
    return {error: "The organization was created"}
  }
  
  await DBClient.getInstance().prisma.organization.create({
    data: {
      slug: values.name,
      createdByUserId: user.id
    }
  });

  return { success: 'Settings created new organization!' };
};
