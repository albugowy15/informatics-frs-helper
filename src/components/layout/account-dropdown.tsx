import { DashboardIcon } from "@radix-ui/react-icons";
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
import * as React from "react";
import LogoutButton from "./logout-button";

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
              {menu.afterSeparator && <DropdownMenuSeparator />}
            </React.Fragment>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <LogoutButton />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
