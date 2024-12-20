'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrentUser } from '@/hooks/use-current-user';
import { LogoutButton } from './logout-button';
import { SettingsButton } from './settings-button';
import { LogOutIcon, Settings } from 'lucide-react';
import { UserAvatar } from '../user-avatar';

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user}/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <SettingsButton>
          <DropdownMenuItem>
            <Settings className='mr-2 h-4 w-4'/>
            Settings
          </DropdownMenuItem>

        </SettingsButton>
        <LogoutButton>
          <DropdownMenuItem>
            <LogOutIcon className='mr-2 h-4 w-4'/>
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
