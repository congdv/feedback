'use client';
import { useSession, signOut as nextAuthSignOut } from 'next-auth/react';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';

import * as authAction from '@/actions/auth.action';
import { LogOut, Settings, User2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';
import paths from '@/paths';
import { useRouter } from 'next/navigation';
import { LoginButton } from '../auth/login-button';
import { UserButton } from '../auth/user-button';

export default function HeaderAuth() {

 
  const session = useSession();
  const router = useRouter();

  let authContent: React.ReactNode;


  const onClickSettings = () => {
    router.push(paths.settings())
  }
  const onClickDashboard = () => {
    router.push(paths.dashboard())
  }

  if (session.status === 'loading') {
    authContent = <Skeleton className="h-8 w-[76px]" />;
  } else if (session.data?.user) {
    authContent = (
      <div className='flex flex-row items-center'>
        <Button className='mr-5' onClick={onClickDashboard}>Dashboard</Button>
        <UserButton/>
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
