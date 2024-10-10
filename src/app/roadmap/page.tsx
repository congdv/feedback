import Board from "@/components/app/kanban/board";
import { Button } from "@/components/ui/button";
import { fetchPostsByGroup } from "@/db/queries/post";
import paths from "@/paths";
import Link from "next/link";

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
          <Board board={board}/>
        </div>

      </div>
    </div>
  )
}