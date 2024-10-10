"use client"
import { Draggable } from "@hello-pangea/dnd";
import { PostWithTagAndStatus } from "@/db/queries/post";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import paths from "@/paths";

interface BoardTicketProps {
  post: PostWithTagAndStatus;
  index: number;
}

export default function BoardTicket({index, post}: BoardTicketProps) {
  const router = useRouter();
  const handleClickPost = (post: PostWithTagAndStatus) => {
    router.push(paths.postShow(post.id));
  };
  const navigate = handleClickPost.bind(null, post);
  return (
    <Draggable key={post.id} draggableId={post.id} index={index}>
      {
        (provided) => (
         <div ref={provided.innerRef} className="flex flex-row p-2 pr-5">
          <Button variant={"ghost"} className="flex flex-col h-[50px] w-[20px]">
            <ChevronUp/>
            <span>2</span>
          </Button>
          <div className=" ml-2 min-w-32 max-w-32">
            <a className="text-lg font-bold text-gray-400 text-ellipsis break-words cursor-pointer hover:underline" onClick={navigate}>{post.title}</a>
            <p className="text-sm">{post.content}</p>
          </div>
         </div>
        )
      }
    </Draggable>
  )
}