"use client"
import { DragDropContext } from '@hello-pangea/dnd';
import { useState } from 'react';
import BoardList from './List';
import { PostByGroup } from '@/db/queries/post';

interface BoardProps {
  board: PostByGroup[]
}

export default function Board({board}: BoardProps) {

  const [currentBoard, ] = useState<PostByGroup[]>(board);

  const onBeforeCapture = () => {
    /*...*/
  };

  const onBeforeDragStart = () => {
    /*...*/
  };

  const onDragStart = () => {
    /*...*/
  };
  const onDragUpdate = () => {
    /*...*/
  };
  const onDragEnd = () => {

  };
  return (
    <>
      <DragDropContext onBeforeCapture={onBeforeCapture}
        onBeforeDragStart={onBeforeDragStart}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}>
        <div className="flex justify-start gap-5 items-start mt-5 overflow-y-auto">
          {
            currentBoard.map((column) => (
              <BoardList key={column.id}  column={column}/>
            ))
          }
        
       
        </div>
      </DragDropContext>
    </>
  )
}