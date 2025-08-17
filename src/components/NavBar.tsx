import { Logo } from "./Logo";
import { UserAvatar } from "./UserAvatar";

function NavBar() {
  return (
    <header className="flex items-center justify-between border-b border-solid px-2 md:px-10 py-3">
      <div className="flex items-center gap-4">
        <div className="size-6">
          <Logo />
        </div>
        <h2 className="text-lg font-bold">Habitual</h2>
      </div>

      <UserAvatar
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVeATwaEbJD5kTARX7JAg1CpWvtwllzKKdFmUkEcp7vao3JAUh7O9jIE25gFPBTF8QocVX46efvq3l5l3kiWNc62E2v-CPnaOZuicMYuMSEenk-1uJ2-fvW6_WkLJgSgPwP99eIbTniipo6iGDkvtgEfODFwsBaGYxnUf5mnSLlQyt1YtDACzvYBNXBFPBiVQgY9mHcGJ46oTGC8CqavVRP4XiclHxMwgIMKwHl24UPY5jn0T55OjoVt1Xonx-IK5-CUiFlHfJTXo"
        name="Juana La Loca"
      />
    </header>
  );
}

export { NavBar };
