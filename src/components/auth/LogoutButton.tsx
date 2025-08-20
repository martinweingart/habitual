"use client";

import { logout } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const onLogout = async () => {
    await logout();
  };

  return <Button onClick={onLogout}>Logout</Button>;
}
