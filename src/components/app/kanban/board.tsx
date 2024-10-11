"use client"
import BoardList from './List';
import { PostByGroup } from '@/db/queries/post';

interface BoardProps {
  board: PostByGroup[]
}

export default function Board({board}: BoardProps) {

  return (
      
    <div className="flex justify-start gap-5 items-start mt-5 overflow-y-auto">
      {
        board.map((column) => (
          <BoardList key={column.id}  column={column}/>
        ))
      }
    </div>
  )
}