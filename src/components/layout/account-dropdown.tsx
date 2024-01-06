"use client";

import { ExitIcon, DashboardIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { menuNavigation } from "@/config/navigation";
import React from "react";

const AccountDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <DashboardIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuNavigation.map((menu) => (
            <React.Fragment key={menu.id}>
              <DropdownMenuItem asChild>
                <Link href={menu.url}>
                  {menu.icon}
                  <span>{menu.name}</span>
                </Link>
              </DropdownMenuItem>
              {menu.afterSeparator ? <DropdownMenuSeparator /> : null}
            </React.Fragment>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={async () => {
              const signOut = (await import("next-auth/react")).signOut;
              void signOut();
            }}
          >
            <ExitIcon className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
