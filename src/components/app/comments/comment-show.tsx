import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { countReactionByCommentId, currentUserReactToComment, fetchCommentsByPostId } from "@/db/queries/comments";
import { Reply, ThumbsDown, ThumbsUp } from "lucide-react";
import ReplyCreateForm from "./reply-create-form";
import CommentReaction from "./comments-reaction";
import { createReaction } from "@/actions/create-reaction";
import type {Reaction } from '@prisma/client';
import { User } from "next-auth";
import { useFormatter } from "next-intl";
import { getFormatter } from "next-intl/server";


interface CommentShowProps {
  commentId: string;
  postId: string;
  reply: boolean;
  user?: User
}


export default async function CommentShow({commentId, postId, user, reply=false}: CommentShowProps) {
  const comments = await fetchCommentsByPostId(postId);
  const reaction = await countReactionByCommentId(commentId);
  const currentUserReact = await currentUserReactToComment(commentId);
  const comment = comments.find(c => c.id === commentId);
  const format = await getFormatter();

  if(!comment) {
    return null;
  }

  const reactToComment = async (commentId: string, type: Reaction) => {
    "use server"
    await createReaction(commentId,type);
  }
  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {

    return (
      <CommentShow key={child.id} commentId={child.id} postId={postId} reply={true} user={user}/>
    );
  });


  const dateTime = new Date(comment.updatedAt);

  const likeCount = reaction.filter(react => react.reaction === 'LIKE').map(react => react._count).reduce((a,b) => a+b, 0);
  const dislikeCount = reaction.filter(react => react.reaction === 'DISLIKE').map(react => react._count).reduce((a,b) => a+b, 0);
  return (
    <div>
       <div className="flex items-center">
          <Avatar>
            <AvatarImage src={comment.user?.image ?? ""} alt={comment.user?.name ?? "unknown"} />
            <AvatarFallback>{comment.user?.name}</AvatarFallback>
          </Avatar>
          <p className="text-sm ml-1.5 text-gray-400">
            <span className="font-bold">{comment.user?.name}</span> |
            <span className="font-bold ml-1.5">{format.relativeTime(dateTime)}</span>
          </p>
        </div>
        <div className="p-5 pl-12">
          <p>{comment.content}</p>
          <div>
            
            <CommentReaction commentId={commentId} likeCount={likeCount} dislikeCount={dislikeCount} reactToComment={reactToComment} reaction={reaction} currentUserReact={currentUserReact}/>
            <ReplyCreateForm postId={postId} parentId={comment.id} user={user}/>
            <div className="pl-4">{renderedChildren}</div>
          
          </div>
        </div>
    </div>
  )
}