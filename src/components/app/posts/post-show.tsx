import type { Post } from '@prisma/client';
import { User } from 'next-auth';
import FeedbackCreateForm from '../feedbacks/feedback-create-form';
import { fetchTags } from '@/db/queries/tag';
import { fetchStatus } from '@/db/queries/status';
interface PostShowProps {
  post: Post;
  user?: User;
}

export default async function PostShow({ post, user }: PostShowProps) {
  const tags = await fetchTags();
  const status = await fetchStatus();

  return (
    <div className="p-5 mb-10 border rounded">
      <div className="flex justify-between">
        <div className="min-h-[36px]">
          <h1 className="text-lg font-semibold ">{post.title}</h1>
        </div>
        {user && user.id === post.userId && (
          <div className="flex justify-end">
            <FeedbackCreateForm
              post={post}
              tags={tags}
              status={status}
            />
          </div>
        )}
      </div>
      <p className="text-[15px] content ">{post.content}</p>
    </div>
  );
}
