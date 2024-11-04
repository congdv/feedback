import paths from "@/paths";
import HeaderAuth from "./header-auth";
import Link from "next/link";
import { getOrganizationByName } from "@/db/queries/organization";

export default async function Header({organizationSlug}: {organizationSlug: string}) {
  const existingOrganization = await getOrganizationByName(organizationSlug);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-5xl py-4 pb-0 mx-auto">
        <div className="flex h-16 justify-between items-center px-4 m-auto">
          <Link href={paths.organizationShow(organizationSlug)} className="font-bold">Feedback</Link>
          <HeaderAuth organizationSlug={organizationSlug} organizationId={existingOrganization?.id}/>
        </div>
      </div>
      
    </header>
    
  )
}