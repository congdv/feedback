'use client';
import { useSession, signOut as nextAuthSignOut } from 'next-auth/react';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';

import * as authAction from '@/actions/auth.action';
import { LogOut, User, User2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import Image from 'next/image';

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;

  const handleGithubLogin = () => {
    return authAction.signIn();
  }

  const handleGoogleLogin = () => {
    return authAction.googleSignIn();
  }

  if (session.status === 'loading') {
    authContent = <Skeleton className="h-8 w-[76px]" />;
  } else if (session.data?.user) {
    authContent = (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar>
                <AvatarImage src={session.data?.user.image as string} />
                <AvatarFallback><User2 className='mx-auto my-2'/></AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-30" align="end">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>My profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={async () => {
                await authAction.signOut();
                await nextAuthSignOut({ redirect: false });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  } else {
    authContent = (
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sign in </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='text-center text-2xl'>Sign in</DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <Button className='w-full w-[300px]' variant={"outline"} onClick={handleGithubLogin}>
            <Image src={"/images/github-mark.svg"}  alt={"Github"} width="20" height="20" className='mr-2'/>
            Github
          </Button>
          <Button className='w-full w-[300px] mt-3' variant={"outline"} onClick={handleGoogleLogin}>
          <Image src={"/images/google.svg"}  alt={"Google"} width="30" height="30" className='mr-2'/>
            Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    );
  }

  return authContent;
}
