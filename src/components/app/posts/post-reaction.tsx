import { PostWithTagStatusAndReaction } from "@/db/queries/post";
import { ChevronUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface PostReactionProps {
  post: PostWithTagStatusAndReaction;
  className: string;
}
export default function PostReaction({post, className}: PostReactionProps) {
  const session = useSession();
  const [userIds, setUserIds] = useState(new Set(post.postReaction.map(p => p.userId)))
  const [upvote, setUpvote] = useState<number>(post.postReaction.length);

  const updateUpvote = async () => {
    if(!session?.data?.user?.id) return;
    try {
      const response = await fetch(`/api/post/upvote/${post.id}`, {
        headers: {
          Accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({userId: session?.data?.user?.id})
      });
      if (response) {
        const data = await response.json();
        setUpvote(data.count);
        setUserIds(new Set(data.reaction.map((p: { userId: string; }) => p.userId)));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={className}
      onClick={updateUpvote}
    >
    <span>
      <ChevronUp className="h-8 w-8" color={`${userIds.has(session.data?.user?.id ?? "###") ? "#f00" : "#000"}`} />
    </span>
    <span>{upvote}</span>
  </div>
  )
}