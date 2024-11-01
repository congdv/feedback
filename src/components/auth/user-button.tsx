'use client';

import { FaUser } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrentUser } from '@/hooks/use-current-user';
import { LogoutButton } from './logout-button';
import { ExitIcon } from '@radix-ui/react-icons';
import { SettingsButton } from './settings-button';
import { LogOutIcon, Settings } from 'lucide-react';

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
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
