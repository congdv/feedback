'use client';
import { useSession } from 'next-auth/react';
import { Button } from '../ui/button';

import { Skeleton } from '../ui/skeleton';
import paths from '@/paths';
import { useRouter } from 'next/navigation';
import { LoginButton } from '../auth/login-button';
import { UserButton } from '../auth/user-button';

export default function HeaderAuth() {

 
  const session = useSession();
  const router = useRouter();

  let authContent: React.ReactNode;


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
