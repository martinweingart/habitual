import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getTodayHabits, requireUser } from "@/lib/actions";
import { HabitCheckForm } from "@/components/habits/HabitCheckForm";
import { PageDescription } from "@/components/PageDescription";
import { PageTitle } from "@/components/PageTitle";

function TodaysHabitFallback() {
  const count = 12;
  return (
    <div className="lg:columns-2 xl:columns-3 space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-start gap-3">
          <Skeleton className="h-4 w-[20px]" />
          <Skeleton className="flex-1 h-4" />
        </div>
      ))}
    </div>
  );
}

async function TodaysHabitContent() {
  const user = await requireUser();
  const todayHabits = await getTodayHabits(user.id);

  return <HabitCheckForm userId={user.id} habits={todayHabits} />;
}

export default async function Habits() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <PageTitle>{"Today's Habits"}</PageTitle>
        <PageDescription>Mark completed habits for today!</PageDescription>
      </div>

      <Suspense fallback={<TodaysHabitFallback />}>
        <TodaysHabitContent />
      </Suspense>
    </div>
  );
}
