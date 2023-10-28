'use client';
import {
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import {
  ArrowRightLeft,
  KeyRound,
  LogOut,
  Newspaper,
  User,
  User2,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const AccountDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/profil'>
              <User2 className='mr-2 h-4 w-4' />
              <span>Profil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/ubah-password'>
              <KeyRound className='mr-2 h-4 w-4' />
              <span>Ubah Password</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/my-frs'>
              <Newspaper className='mr-2 h-4 w-4' />
              <span>myFRS</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/my-trade-matkul'>
              <ArrowRightLeft className='mr-2 h-4 w-4' />
              <span>myTradeMatkul</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={async () => {
              const signOut = (await import('next-auth/react')).signOut;
              signOut();
            }}
          >
            <LogOut className='mr-2 h-4 w-4' />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
