import { auth } from '@/auth';
import CommentCreateForm from '@/components/app/comments/comment-create-form';
import CommentList from '@/components/app/comments/comment-list';
import PostShow from '@/components/posts/post-show';
import PostSummary from '@/components/posts/post-summary';
import { getOrganizationByName } from '@/db/queries/organization';
import { fetchPostById } from '@/db/queries/post';
import { notFound } from 'next/navigation';

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;
  const session = await auth();

  const post = await fetchPostById(postId);
  const existingOrganization = await getOrganizationByName(slug);

  if (!post || !existingOrganization) {
    notFound();
  }

  return (
    <div className="max-w-5xl h-ful mx-auto">
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-8/12 p-[18px]">
          <PostShow post={post} user={session?.user} organizationId={existingOrganization.id} />
          {session?.user?.id ? (
            <CommentCreateForm postId={post.id} organizationSlug={existingOrganization.slug}/>
          ) : (
            <div className="py-5 pl-2 text-red-500 border rounded mb-5">
              Sign in to comment
            </div>
          )}
          <CommentList postId={post.id} user={session?.user} organizationSlug={existingOrganization.slug}/>
        </div>
        <div className="md:w-4/12 p-[18px]  border-l border-b">
          <PostSummary post={post} />
        </div>
      </div>
    </div>
  );
}
