import { auth } from '@/auth';
import Feedbacks from '@/components/app/feedbacks/feedbacks';
import { Button } from '@/components/ui/button';
import { getOrganizationByName } from '@/db/queries/organization';
import { fetchStatus } from '@/db/queries/status';
import { fetchTags } from '@/db/queries/tag';
import paths from '@/paths';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface WorkspaceHomePageProps {
  params: {
    slug: string;
  };
}

export default async function WorkspaceHomePage({params}: WorkspaceHomePageProps) {
  const { slug } = params;
  const tags = await fetchTags();
  const status = await fetchStatus();
  const session = await auth();
  const existingOrganization = await getOrganizationByName(slug);
  if(!existingOrganization) {
    notFound();
  }

  return (
    <div className="max-w-5xl py-4 pb-5 mx-auto">
      <div className="flex items-center">
        <Button variant="default">Feedback</Button>
        <Button variant="ghost">
          <Link href={paths.roadmap(slug)}>Roadmap</Link>
        </Button>
      </div>
      <Feedbacks tags={tags} status={status} user={session?.user} organizationId={existingOrganization.id} organizationSlug={existingOrganization.slug}/>
    </div>
  );
}
