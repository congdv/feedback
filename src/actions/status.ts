'use server';

import { fetchStatus } from '@/db/queries/status';

export const fetchListOfStatus = () => {
  return fetchStatus();
};
