"use client";

import { startTransition, useOptimistic } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {} from "@/components/ui/form";
import { Label } from "../ui/label";
import { UserDailyHabit } from "@/types";
import { cn } from "@/lib/utils";
import {
  markAllCompleted,
  markCompleted,
  markUncompleted,
} from "@/lib/actions";
import { Button } from "../ui/button";
import { USER_ID } from "@/session";

type OptimisticActionAll = {
  type: "all";
};
type OptimisticActionSingle = {
  type: "single";
  id: number;
  checked: boolean;
};
type OptimisticAction = OptimisticActionAll | OptimisticActionSingle;

function optimisticUpdate(
  prevHabits: UserDailyHabit[],
  action: OptimisticAction
) {
  if (action.type === "all") {
    return prevHabits.map((habit: UserDailyHabit) => ({
      ...habit,
      completed_at: new Date(),
    }));
  } else {
    return prevHabits.map((habit: UserDailyHabit) =>
      habit.id === action.id
        ? { ...habit, completed_at: action.checked ? new Date() : null }
        : habit
    );
  }
}

type HabitCheckFormProps = {
  habits: UserDailyHabit[];
};

export function HabitCheckForm(props: HabitCheckFormProps) {
  const [optimisticHabits, setOptimisticHabits] = useOptimistic<
    UserDailyHabit[],
    OptimisticAction
  >(props.habits, optimisticUpdate);

  const onToggle = async (id: number, checked: boolean) => {
    startTransition(async () => {
      setOptimisticHabits({ type: "single", id, checked });
    });

    if (checked) {
      await markCompleted(id);
    } else {
      await markUncompleted(id);
    }
  };

  const onMarkAll = async () => {
    startTransition(async () => {
      setOptimisticHabits({ type: "all" });
    });

    await markAllCompleted(USER_ID);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="lg:columns-2 xl:columns-3 space-y-4">
        {optimisticHabits.map((habit: UserDailyHabit) => (
          <div key={habit.id} className="flex items-start gap-3">
            <Checkbox
              id={`toggle-${habit.id}`}
              checked={!!habit.completed_at}
              onCheckedChange={(checked) =>
                onToggle(habit.id, Boolean(checked))
              }
            />
            <Label
              htmlFor={`toggle-${habit.id}`}
              className={cn({
                "line-through": !!habit.completed_at,
              })}
            >
              {habit.title}
            </Label>
          </div>
        ))}
      </div>

      <Button className="self-start" variant="primary" onClick={onMarkAll}>
        Mark All as Done
      </Button>
    </div>
  );
}
