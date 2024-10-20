'use server';

import { fetchTags } from '@/db/queries/tag';

export const fetchListOfTag = () => {
  return fetchTags();
};
