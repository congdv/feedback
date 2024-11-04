import {
  fetchCommentsByPostId,
} from '@/db/queries/comments';
import ReplyCreateForm from './reply-create-form';
import { User } from 'next-auth';
import { getFormatter } from 'next-intl/server';
import { UserAvatar } from '@/components/user-avatar';

interface CommentShowProps {
  commentId: string;
  postId: string;
  reply: boolean;
  user?: User;
  organizationSlug: string;
}

export default async function CommentShow({
  commentId,
  postId,
  user,
  organizationSlug
}: CommentShowProps) {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);
  const format = await getFormatter();

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return (
      <CommentShow
        key={child.id}
        commentId={child.id}
        postId={postId}
        reply={true}
        user={user}
        organizationSlug={organizationSlug}
      />
    );
  });

  const dateTime = new Date(comment.updatedAt);

  return (
    <div>
      <div className="flex items-center">
        <UserAvatar user={comment.user}/>
        <p className="text-sm ml-1.5 text-gray-400">
          <span className="font-bold">{comment.user?.name}</span> |
          <span className="font-bold ml-1.5">
            {format.relativeTime(dateTime)}
          </span>
        </p>
      </div>
      <div className="p-5 pl-12">
        <p>{comment.content}</p>
          <ReplyCreateForm postId={postId} currentComment={comment} parentId={comment.id} user={user} organizationSlug={organizationSlug}/>
          <div className="pl-4">{renderedChildren}</div>
      </div>
    </div>
  );
}
