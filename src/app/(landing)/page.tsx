import paths from "@/paths";
import Link from "next/link";

export default function LandingPage() {
  return(
    <div>
      This is a landing page. Here is example of an organization
      <p>Visit <Link href={paths.organizationShow("demo")} className="text-blue-400">demo organization</Link> </p>
      
    </div>
  )
}