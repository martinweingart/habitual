import { PageTitle } from "@/components/PageTitle";
import { PageDescription } from "@/components/PageDescription";
import { getUserHabits } from "@/lib/actions";
import { USER } from "@/session";
import { Habit } from "@/types";
import { HabitsTable } from "@/components/habits/HabitsTable";

export default async function Habits() {
  const habits: Habit[] = await getUserHabits(USER.id);

  return (
    <div className="h-full grid grid-rows-[auto_minmax(0,1fr)] gap-8">
      <div className="flex justify-between pr-5">
        <div>
          <PageTitle>{"Manage Habits"}</PageTitle>
          <PageDescription>Add, edit, or delete your habits</PageDescription>
        </div>
      </div>

      <HabitsTable habits={habits} />
    </div>
  );
}
