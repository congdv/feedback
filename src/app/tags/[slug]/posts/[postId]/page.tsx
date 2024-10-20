import { auth } from '@/auth';
import CommentCreateForm from '@/components/app/comments/comment-create-form';
import CommentList from '@/components/app/comments/comment-list';
import PostShow from '@/components/posts/post-show';
import PostSummary from '@/components/posts/post-summary';
import { fetchPostById } from '@/db/queries/post';
import { notFound } from 'next/navigation';

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { postId } = params;
  const session = await auth();

  const post = await fetchPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-5xl h-ful mx-auto">
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-8/12 p-[18px]">
          <PostShow post={post} user={session?.user} />
          {session?.user?.id && <CommentCreateForm postId={post.id} />}
          <CommentList postId={post.id} user={session?.user} />
        </div>
        <div className="md:w-4/12 p-[18px]  border-l border-b">
          <PostSummary post={post} />
        </div>
      </div>
    </div>
  );
}
