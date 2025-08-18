import { HabitCheckForm } from "@/components/habits/HabitCheckForm";
import { PageTitle } from "@/components/PageTitle";
import { PageDescription } from "@/components/PageDescription";
import { getTodayHabits } from "@/lib/actions";
import { USER } from "@/session";

export default async function Habits() {
  const todayHabits = await getTodayHabits(USER.id);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <PageTitle>{"Today's Habits"}</PageTitle>
        <PageDescription>Mark completed habits for today!</PageDescription>
      </div>

      <div className="flex-1">
        <HabitCheckForm habits={todayHabits} />
      </div>
    </div>
  );
}
