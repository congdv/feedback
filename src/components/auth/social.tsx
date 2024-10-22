'use client';

import { FaGithub } from 'react-icons/fa';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from "next-auth/react";
import paths from '@/paths';

export const Social = () => {
  const onClick =(provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: paths.home()
    })
  }
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={'lg'}
        className="w-full"
        variant={'outline'}
        onClick={() => onClick("google")}
      >
        <FcGoogle />
      </Button>
      <Button
        size={'lg'}
        className="w-full"
        variant={'outline'}
        onClick={() => onClick("github")}
      >
        <FaGithub />
      </Button>
    </div>
  );
};
