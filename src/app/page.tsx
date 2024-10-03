import { auth } from "@/auth";
import FeedbackCreateForm from "@/components/app/feedbacks/feedback-create-form";
import PostList from "@/components/app/posts/post-list";
import { Button } from "@/components/ui/button";
import { fetchPosts } from "@/db/queries/post";
import { fetchStatus } from "@/db/queries/status";
import { fetchTags } from "@/db/queries/tag";
import paths from "@/paths";
import { CirclePlus, Clock, Flame, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const tags = await fetchTags();
  const status = await fetchStatus();
  const posts = await fetchPosts();
  const session = await auth();
  return (
    <div className="max-w-5xl py-4 pb-5 mx-auto">
      <div className="flex items-center">
        <Button variant="default">Feedback</Button>
        <Button variant="ghost">
          <Link href={paths.roadmap()} >Roadmap</Link>
        </Button>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className="flex flex-row gap-x-2">
          <Button variant="outline">
            <Flame className="mr-2 h-4 w-4" />
            Top
          </Button>
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4"/> New
          </Button>
          <Button variant="outline">
          <TrendingUp className="mr-2 h-4 w-4"/> Trending
          </Button>
        </div>
        <div>
          {session?.user?.id && <FeedbackCreateForm post={null} tags={tags} tagId={tags[0].id} statusId={status[0].id}  status={status}/>}
        </div>
      </div>
      <PostList posts={posts}/>

    </div>
  );
}
