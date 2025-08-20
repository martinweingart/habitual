import { Suspense } from "react";
import { HabitStreakList } from "@/components/habits/dashboard/HabitStreakList";
import { PageHeader } from "@/components/PageHeader";
import { getUserStreaks, getWeekCompletion, requireUser } from "@/lib/actions";
import { UserHabitStreak } from "@/types";
import { HabitWeekChart } from "@/components/habits/dashboard/HabitWeekChart";
import { Loader2Icon } from "lucide-react";

function getData(userId: number) {
  return Promise.all([getUserStreaks(userId), getWeekCompletion(userId)]);
}

async function DashboardStreaks() {
  const user = await requireUser();
  const [streaks, week] = await getData(user.id);

  return (
    <div className="flex flex-col gap-8 box-border">
      <HabitStreakList list={streaks as UserHabitStreak[]} />
      <HabitWeekChart {...week} />
    </div>
  );
}

function DashboardFallback() {
  return (
    <div className="flex py-15 justify-center">
      <Loader2Icon className="size-15 animate-spin" />
    </div>
  );
}

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description="Track your progress and stay motivated"
      />

      <Suspense fallback={<DashboardFallback />}>
        <DashboardStreaks />
      </Suspense>
    </div>
  );
}
