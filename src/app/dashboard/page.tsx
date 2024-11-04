import { DashboardNavbar } from "@/components/dashboard-navbar";
import { OrganizationForm } from "@/components/organization-form";

export default function Dashboard() {
  return (
    <div className="max-w-5xl py-4 pb-5 mx-auto">
      <DashboardNavbar/>
      <OrganizationForm/>
    </div>
  )
}