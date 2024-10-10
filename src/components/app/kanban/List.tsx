import { Droppable } from "@hello-pangea/dnd";
import BoardTicket from "./Ticket";
import { PostByGroup } from "@/db/queries/post";


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
    <Droppable key={column.id} droppableId={column.id}>
      {
        (provided => (
          <div
              ref={provided.innerRef}
              className='border rounded flex flex-col gap-5 min-h-[500px]'
              {...provided.droppableProps}
          >
            <h1 className="p-5 border-b-2 text-2xl text-blue-700">{column.description}</h1>
              {
                column.posts.map((post, index) => (
                  <BoardTicket key={post.id} index={index} post={post}/>
                ))
              }

          </div>
        ))
      }
    </Droppable>
  )
}