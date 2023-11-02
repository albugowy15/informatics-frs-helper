"use client";

import { LogIn, Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { type Session } from "next-auth";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { type Navigation } from "@/config/navigation";

type NavbarProps = {
  items: Navigation[];
  session: Session | null;
};

const DynamicAccountDropdown = dynamic(() => import("./account-dropdown"), {
  ssr: false,
});

const Navbar = ({ items, session }: NavbarProps) => {
  return (
    <header className="flex items-center justify-between border-b px-3 py-2 md:container">
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink>
                <span className="mr-2 text-lg font-bold">TC FRS Helper</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
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
        <SheetTrigger className="md:hidden" asChild>
          <Button aria-label="Menu" variant="outline" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col items-start gap-3 py-4">
            <Link href="/" className="font-bold">
              TC FRS Helper
            </Link>

            {items.map((item, index) => (
              <SheetClose key={index} asChild>
                <Link href={item.url} key={item.name}>
                  {item.name}
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        {session?.user ? (
          <DynamicAccountDropdown />
        ) : (
          <>
            <Button
              aria-label="Masuk"
              variant="outline"
              onClick={async () => {
                const signIn = (await import("next-auth/react")).signIn;
                void signIn();
              }}
            >
              <LogIn className="mr-2 h-4 w-4" /> Masuk
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
