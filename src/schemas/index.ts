import * as z from 'zod';

export const PostSchema = z.object({
  title: z.string().min(3, {
    message: 'Minimum of 3 characters required',
  }),
  content: z.string().min(10, {
    message: 'Minimum of 10 characters required',
  }),
  tagId: z.optional(z.string()),
  statusId: z.optional(z.string()),
});
