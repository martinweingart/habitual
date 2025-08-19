import { JSX } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export async function checkUserLogged(page: () => Promise<JSX.Element>) {
  const user = await getCurrentUser();
  if (user) redirect("/habits");

  return page();
}
