"use client"
import { useEffect, useState } from 'react';
import BoardList from './List';
import { PostByGroup } from '@/db/queries/post';
import { Skeleton } from '../ui/skeleton';


export default function Board() {
  const [isLoading, setLoading] = useState(false);
  const [board, setBoard] = useState<PostByGroup[]>([]);

  const fetchPost = async() => {
    try {
      setLoading(true);
      const response = await fetch(`/api/post/by-group`, {
        headers: {
          Accept: 'application/json',
          method: 'GET',
        },
      });
      if (response) {
        const data = await response.json();
        setBoard(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

    }
  }

  useEffect(() => {
    fetchPost();
  },[])

  if(isLoading) {
    return (
      <div className="flex justify-start gap-5 items-start mt-5 overflow-y-auto">
        <Skeleton className="h-64 w-full " />
      </div>
    )
  }

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