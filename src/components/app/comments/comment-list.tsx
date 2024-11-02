import { fetchCommentsByPostId } from "@/db/queries/comments";
import CommentShow from "./comment-show";
import { User } from "next-auth";

interface CommentListProps {
  postId: string;
  user?: User;
  organizationSlug: string;
}

export default async function CommentList({ postId, user, organizationSlug }: CommentListProps) {
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );

  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        postId={comment.postId}
        reply={false}
        user={user}
        organizationSlug={organizationSlug}
      />
    );
  });

  return <div>{renderedComments}</div>;
}
