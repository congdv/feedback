import BoardTicket from "./Ticket";
import { PostByGroup, PostWithTagStatusAndReaction } from "@/db/queries/post";


export interface Ticket {
  id: string;
  title: string;
  content: string;
}

interface BoardListProps {
  column: PostByGroup;
}

export default function BoardList({column}: BoardListProps) {
  return (
    <div
        className='border rounded flex flex-col gap-5 min-h-[500px] min-w-[250px] max-w-[250px]'
    >
      <h1 className="p-5 border-b-2 text-2xl text-blue-700">{column.description}</h1>
      <div className="min-h-full ">
        {
          column.posts.map((post: PostWithTagStatusAndReaction) => (
            <BoardTicket key={post.id} post={post}/>
          ))
        }
      </div>

    </div>
  )
}