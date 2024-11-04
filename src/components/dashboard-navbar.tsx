"use client"
import { ChevronLeft } from "lucide-react"
import { Button } from "./ui/button"
import { useCurrentUser } from "@/hooks/use-current-user"
import { logout } from "@/actions/logout"
import paths from "@/paths"
import { signOut } from "next-auth/react"

export const DashboardNavbar = () => {
  const user = useCurrentUser();
  const onClick = async() => {
    await logout(paths.home());
    await signOut();
  };

  return (
    <div>
      <Button variant={"outline"} onClick={onClick}>
        <ChevronLeft className="h-4 w-4"/>
        Sign out
      </Button>
      <div className="mt-5">
        <p className="text-sm font-light text-black-400">Logged in as:</p>
        <p className="text-sm font-light text-black-400">{user?.email}</p>
      </div>
    </div>
  )
}