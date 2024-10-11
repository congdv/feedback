import Board from "@/components/app/kanban/board";
import { Button } from "@/components/ui/button";
import { fetchPostsByGroup } from "@/db/queries/post";
import paths from "@/paths";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function RoadMap() {

  const board = await fetchPostsByGroup();
  return (
    <div>
      <div className="max-w-5xl py-4 pb-5 mx-auto">
        <div className="flex items-center">
          <Button variant="ghost">
            <Link href={paths.home()} >Feedback</Link>

          </Button>
          <Button variant="default"> Roadmap
          </Button>
        </div>
        <div className="p-10">
          {
            board.length > 0 ? <Board board={board}/> : 
            <div className='p-10'>
              <p className='text-xl text-black-400 text-center'>No posts have been added yet.</p>
            </div>
          }
        </div>

      </div>
    </div>
  )
}