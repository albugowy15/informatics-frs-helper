'use client';

import {
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import {
  ArrowRightLeft,
  KeyRound,
  LogIn,
  LogOut,
  Menu,
  Newspaper,
  User,
  User2,
} from 'lucide-react';
import Link from 'next/link';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

import { ThemeToggle } from '@/components/theme-toggle';
import Typography from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import { type Navigation } from '@/config/navigation';

type NavbarProps = {
  items: Navigation[];
  session: Session | null;
};

const Navbar = ({ items, session }: NavbarProps) => {
  return (
    <header className='py-2 flex justify-between items-center border-b px-3 md:container'>
      <NavigationMenu className='hidden md:block'>
        <NavigationMenuList>
          {items.map((item) => (
            <NavigationMenuItem key={item.name}>
              <Link href={item.url} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Sheet>
        <SheetTrigger className='md:hidden' asChild>
          <Button variant='outline' size='icon'>
            <Menu className='h-4 w-4' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <div className='flex flex-col items-start py-4'>
            <Typography variant='h4'>TC FRS Helper</Typography>
            {items.map((item, index) => (
              <SheetClose key={index} asChild>
                <Button variant='link' className='px-0' asChild>
                  <Link href={item.url} className='text-lg' key={item.name}>
                    {item.name}
                  </Link>
                </Button>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <div className='flex items-center gap-2'>
        <ThemeToggle />
        {session?.user ? (
          <>
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
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button variant='outline' onClick={() => signIn()}>
              <LogIn className='mr-2 h-4 w-4' /> Masuk
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
