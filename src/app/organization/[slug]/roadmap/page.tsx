import Board from "@/components/roadmap/board";
import { Button } from "@/components/ui/button";
import paths from "@/paths";
import Link from "next/link";

export default function RoadMap({params}: {params: {slug: string}}) {
  return (
    <div>
      <div className="max-w-5xl py-4 pb-5 mx-auto">
        <div className="flex items-center">
          <Button variant="ghost">
            <Link href={paths.organizationShow(params.slug)}>Feedback</Link>
          </Button>
          <Button variant="default"> Roadmap </Button>
        </div>
        <div className="p-10">
          <Board organizationSlug={params.slug}/>
        </div>
      </div>
    </div>
  );
}
