import { Suspense } from "react";
import { PageTitle } from "@/components/PageTitle";
import { PageDescription } from "@/components/PageDescription";
import { getUserHabits, requireUser } from "@/lib/actions";
import { Habit } from "@/types";
import { HabitsManage } from "@/components/habits/HabitsManage";
import { Skeleton } from "@/components/ui/skeleton";

async function HabitsFallback() {
  const count = 10;

  return (
    <div className="flex flex-col gap-4">
      <div className="self-end">
        <Skeleton className="h-[25px] w-[60px]" />
      </div>

      <div className="flex flex-col">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`flex gap-10 py-2 ${i < count - 1 ? "border-b" : ""}`}
          >
            <Skeleton className="flex-1 h-[25px] w-[60px]" />
            <Skeleton className="h-[25px] w-[60px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

async function HabitsContent() {
  const user = await requireUser();

  const habits: Habit[] = (await getUserHabits(user.id)) as Habit[];
  return <HabitsManage userId={user.id} habits={habits} />;
}

export default async function Habits() {
  return (
    <div className="h-full grid grid-rows-[auto_minmax(0,1fr)] gap-8">
      <div className="flex justify-between pr-5">
        <div>
          <PageTitle>{"Manage Habits"}</PageTitle>
          <PageDescription>Add, edit, or delete your habits</PageDescription>
        </div>
      </div>

      <Suspense fallback={<HabitsFallback />}>
        <HabitsContent />
      </Suspense>
    </div>
  );
}
