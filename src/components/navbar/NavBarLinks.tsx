import Link from "next/link";
import { NavBarMenu } from "@/components/navbar/NavBarMenu";

export function NavBarLinks() {
  return (
    <>
      <NavBarMenu className="md:hidden" />

      <div className="hidden md:flex items-center gap-4">
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
    </>
  );
}
