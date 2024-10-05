'use client';
import { useSession, signOut as nextAuthSignOut } from 'next-auth/react';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';

import * as authAction from '@/actions/auth.action';
import { LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;

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
                <AvatarFallback>{session.data.user.name}</AvatarFallback>
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
      <form action={authAction.signIn}>
        <Button type="submit" variant="outline">
          Sign in{' '}
        </Button>
      </form>
    );
  }

  return authContent;
}
