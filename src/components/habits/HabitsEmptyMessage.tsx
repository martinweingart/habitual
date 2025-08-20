import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HabitsEmptyMessage() {
  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="text-2xl font-semibold">No habits yet</h2>
      <p className="text-gray-500 text-sm">
        {
          "You haven't added any habits to track yet. Start by adding your first habit."
        }
      </p>

      <Link href="/habits/manage">
        <Button variant="secondary">Start Here</Button>
      </Link>
    </div>
  );
}
