import { ThemeToggle } from "@/components/theme-toggle";
import { getServerAuthSession } from "@/server/auth";
import LoginAction from "./login-action";
import AccountDropdown from "../account-dropdown";

const UserNav = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      {session?.user ? <AccountDropdown /> : <LoginAction />}
    </div>
  );
};

export default UserNav;
