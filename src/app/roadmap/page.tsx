import { Button } from "@/components/ui/button";
import paths from "@/paths";
import Link from "next/link";

export default function RoadMap() {
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

    </div>
    </div>
  )
}