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
            <DropdownMenuItem onSelect={onClickSettings}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={async () => {
                await authAction.signOut();
                await nextAuthSignOut({ redirect: true, callbackUrl: paths.home() });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
