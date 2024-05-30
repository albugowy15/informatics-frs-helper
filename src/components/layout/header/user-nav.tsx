import { ModeToggle } from "@/components/theme-toggle";
import LoginAction from "./login-action";
import AccountDropdown from "../account-dropdown";
import { auth } from "@/server/auth";

const UserNav = async () => {
  const session = await auth();
  return (
    <div className="flex items-center gap-2">
      <ModeToggle />
      {session?.user ? <AccountDropdown /> : <LoginAction />}
    </div>
  );
};

export default UserNav;
