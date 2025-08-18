import Link from "next/link";
import { Logo } from "./Logo";
import { UserAvatar } from "./UserAvatar";
import { USER } from "@/session";

function NavBar() {
  return (
    <header className="flex items-center justify-between border-b border-solid px-2 md:px-10 py-3">
      <div className="flex items-center gap-4">
        <div className="size-6">
          <Logo />
        </div>
        <h2 className="text-lg font-bold">Habitual</h2>
      </div>

      <div className="flex items-center gap-9">
        <div className="flex items-center gap-4">
          <Link className="text-sm font-medium" href="/habits">
            Today
          </Link>
          <Link className="text-sm font-medium" href="/habits/manage">
            Manage
          </Link>
          <Link className="text-sm font-medium" href="/habits/dashboard">
            Dashboard
          </Link>
        </div>

        <UserAvatar src={USER.avatar_url} name={USER.name} />
      </div>
    </header>
  );
}

export { NavBar };
