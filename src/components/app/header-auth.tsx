"use client";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

import { Skeleton } from "../ui/skeleton";
import paths from "@/paths";
import { useRouter } from "next/navigation";
import { LoginButton } from "../auth/login-button";
import { UserButton } from "../auth/user-button";
import { useEffect, useState } from "react";

export default function HeaderAuth({
  organizationSlug,
  organizationId,
}: {
  organizationSlug: string;
  organizationId: string | undefined;
}) {
  const session = useSession();
  const router = useRouter();
  const [isOwner, setOwner] = useState(false);

  useEffect(() => {
    async function checkOwnership() {
      const res = await fetch(`/api/organization/owner/${organizationId}`);
      const data = await res.json();
      setOwner(data.isOwner);
    }
    if(organizationId) {
      checkOwnership();
    }
  }, [organizationId])

  let authContent: React.ReactNode;

  const onClickDashboard = () => {
    router.push(paths.dashboard(organizationSlug));
  };

  if (session.status === "loading") {
    authContent = <Skeleton className="h-8 w-[76px]" />;
  } else if (session.data?.user) {
    authContent = (
      <div className="flex flex-row items-center">
        {isOwner && <Button className="mr-5" onClick={onClickDashboard}>
          Dashboard
        </Button>}
        <UserButton />
      </div>
    );
  } else {
    authContent = (
      <LoginButton>
        <p>Login</p>
      </LoginButton>
    );
  }

  return authContent;
}
