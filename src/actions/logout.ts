'use server';

import { signOut } from '@/auth';

export const logout = async (redirectTo?: string) => {
  //Some server stuff
  // clear information before logout
  await signOut({redirectTo});
};
