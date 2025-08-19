import { Logo } from "@/components/Logo";
import { NavBarLinks } from "@/components/navbar/NavBarLinks";
import { LogoutButton } from "@/components/auth/LogoutButton";

async function NavBar() {
  return (
    <header className="flex items-center justify-between border-b border-solid px-2 md:px-10 py-3">
      <div className="flex items-center gap-4">
        <div className="size-6">
          <Logo />
        </div>
        <h2 className="text-lg font-bold">Habitual</h2>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <NavBarLinks />

        <LogoutButton />
      </div>
    </header>
  );
}

export { NavBar };
