"use client"
import { ErrorCard } from "@/components/auth/error-card";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : undefined;
  return (
    <div className="h-3/6 flex items-center justify-center">
          <ErrorCard errorLabel={urlError}/>

    </div>
  )
}