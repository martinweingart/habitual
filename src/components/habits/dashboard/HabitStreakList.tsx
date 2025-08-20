import { UserHabitStreak } from "@/types";
import { HabitStreak } from "./HabitStreak";

type HabitStreakListProps = {
  list: UserHabitStreak[];
};

export function HabitStreakList(props: HabitStreakListProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {props.list.map((item) => (
        <HabitStreak key={item.habit_id} {...item} />
      ))}
    </div>
  );
}
