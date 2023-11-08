import { Loader2, Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { type Navigation } from "@/config/navigation";
import UserNav from "./header/user-nav";
import React from "react";

interface NavbarProps {
  items: Navigation[];
}

const Navbar = ({ items }: NavbarProps) => {
  return (
    <header className="flex items-center justify-between border-b px-3 py-2 md:container">
      <nav className="hidden items-center space-x-4 md:flex lg:space-x-6">
        <Link
          href="/"
          className="font-bold transition-colors hover:text-primary"
        >
          TC FRS Helper
        </Link>
        {items.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {item.name}
          </Link>
        ))}
      </nav>
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
      <React.Suspense fallback={<Loader2 className="h-4 w-4 animate-spin" />}>
        <UserNav />
      </React.Suspense>
    </header>
  );
};

export default Navbar;
