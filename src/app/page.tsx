import { auth } from '@/auth';
import Feedbacks from '@/components/app/feedbacks/feedbacks';
import { Button } from '@/components/ui/button';
import { fetchStatus } from '@/db/queries/status';
import { fetchTags } from '@/db/queries/tag';
import paths from '@/paths';
import Link from 'next/link';

export default async function Home() {
  const tags = await fetchTags();
  const status = await fetchStatus();
  const session = await auth();
  return (
    <div className="max-w-5xl py-4 pb-5 mx-auto">
      <div className="flex items-center">
        <Button variant="default">Feedback</Button>
        <Button variant="ghost">
          <Link href={paths.roadmap()}>Roadmap</Link>
        </Button>
      </div>
      <Feedbacks tags={tags} status={status} user={session?.user} />
    </div>
  );
}
