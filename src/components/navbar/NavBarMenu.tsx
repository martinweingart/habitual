"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavBarMenu(props: React.ComponentProps<"div">) {
  return (
    <div className={props.className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="size-8">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href="/habits">
            <DropdownMenuItem>Today</DropdownMenuItem>
          </Link>
          <Link href="/habits/manage">
            <DropdownMenuItem>Manage</DropdownMenuItem>
          </Link>
          <Link href="/habits/dashboard">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
