"use client";

import { LogIn, Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { type Session } from "next-auth";

import { ThemeToggle } from "@/components/theme-toggle";
import Typography from "@/components/typography";
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
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col items-start py-4">
            <Typography variant="h4">TC FRS Helper</Typography>
            {items.map((item, index) => (
              <SheetClose key={index} asChild>
                <Button variant="link" className="px-0" asChild>
                  <Link href={item.url} className="text-lg" key={item.name}>
                    {item.name}
                  </Link>
                </Button>
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
