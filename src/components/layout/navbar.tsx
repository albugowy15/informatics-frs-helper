'use client';

import { LogIn, Menu } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import { ThemeToggle } from '@/components/theme-toggle';
import Typography from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { type Navigation } from '@/config/navigation';

type NavbarProps = {
  items: Navigation[];
};

const Navbar = ({ items }: NavbarProps) => {
  return (
    <header className='py-2 flex justify-between items-center border-b container'>
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
              <Button variant='link' className='px-0' key={index} asChild>
                <Link href={item.url} className='text-lg' key={item.name}>
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <div className='flex items-center gap-2'>
        <ThemeToggle />
        <Button variant='outline' onClick={() => signIn()}>
          <LogIn className='mr-2 h-4 w-4' /> Masuk
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
