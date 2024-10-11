"use client"
import { PostWithTagAndStatus, PostWithTagStatusAndReaction } from "@/db/queries/post";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import paths from "@/paths";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface BoardTicketProps {
  post: PostWithTagStatusAndReaction
}

export default function BoardTicket({post}: BoardTicketProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [upvotes, setUpvotes] = useState<number>(post.postReaction.length);
  const [reactionUsers, setReactionUsers] = useState(new Set(post.postReaction.map(p => p.userId)));
  const handleClickPost = (post: PostWithTagAndStatus) => {
    router.push(paths.postShow(post.id));
  };
  const navigate = handleClickPost.bind(null, post);

  const handleUpvote = async () => {
    if(!session?.user?.id) {
      return;
    }
    try {
      const response = await fetch(`/api/post/upvote/${post.id}`, {
        headers: {
          Accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({userId: session?.user?.id})
      });
      if (response) {
        const data = await response.json();
        setUpvotes(data.count);
        setReactionUsers(new Set(data.reaction.map((p: { userId: string; }) => p.userId)));
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-row p-2 pr-5">
      <Button variant={"ghost"} className="flex flex-col h-[50px] w-[20px]" onClick={handleUpvote}>
        <ChevronUp color={`${reactionUsers.has(session?.user?.id ?? "###") ? "#f00" : "#000"}`}/>
        <span>{upvotes}</span>
      </Button>
      <div className=" ml-2 min-w-32 max-w-32">
        <a className="text-lg font-bold text-gray-400 text-ellipsis break-words cursor-pointer hover:underline" onClick={navigate}>{post.title}</a>
        <p className="text-sm">{post.content}</p>
      </div>
    </div>
  )
}