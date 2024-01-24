"use client";

import { ExitIcon } from "@radix-ui/react-icons";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const LogoutButton = () => {
  return (
    <DropdownMenuItem
      onClick={async () => {
        const signOut = (await import("next-auth/react")).signOut;
        void signOut();
      }}
    >
      <ExitIcon className="mr-2 h-4 w-4" />
      <span>Logout</span>
    </DropdownMenuItem>
  );
};

export default LogoutButton;
