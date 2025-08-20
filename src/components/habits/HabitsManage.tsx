"use client";

import { startTransition, useOptimistic, useState } from "react";
import { Edit, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addHabit, deleteHabit, updateHabit } from "@/lib/actions";
import { Habit, HabitFormValue } from "@/types";
import { Button } from "@/components/ui/button";
import { HabitDeleteConfirmDialog } from "@/components/habits/HabitDeleteConfirmDialog";
import { HabitFormDialog } from "@/components/habits/HabitFormDialog";

type OptimisticActionAdd = {
  type: "add";
  habit: Habit;
};
type OptimisticActionUpdate = {
  type: "update";
  habit: Habit;
};
type OptimisticActionDelete = {
  type: "delete";
  id: number;
};
type OptimisticAction =
  | OptimisticActionAdd
  | OptimisticActionUpdate
  | OptimisticActionDelete;

function optimisticUpdate(prevHabits: Habit[], action: OptimisticAction) {
  if (action.type === "delete") {
    return prevHabits.filter((h) => h.id !== action.id);
  } else if (action.type === "add") {
    const newHabits = [...prevHabits, action.habit];
    newHabits.sort((a, b) => a.title.localeCompare(b.title));
    return newHabits;
  } else if (action.type === "update") {
    return prevHabits.map((h) => {
      return h.id === action.habit.id ? { ...action.habit } : h;
    });
  } else {
    return prevHabits;
  }
}

type HabitsManageProps = {
  userId: number;
  habits: Habit[];
};

export function HabitsManage(props: HabitsManageProps) {
  const [optimisticHabits, setOptimisticHabits] = useOptimistic<
    Habit[],
    OptimisticAction
  >(props.habits, optimisticUpdate);
  const [selected, setSelected] = useState<Habit | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [formDialogOpen, setFormDialogOpen] = useState<boolean>(false);

  const onDeleteHabit = (habit: Habit) => {
    setSelected(habit);
    setDeleteDialogOpen(true);
  };

  const onDeleteDialogOpenChange = (open: boolean) => {
    if (!open) {
      setSelected(undefined);
    }
    setDeleteDialogOpen(open);
  };

  const onFormDialogOpenChange = (open: boolean) => {
    if (!open) {
      setSelected(undefined);
    }
    setFormDialogOpen(open);
  };

  const onDeleteConfirm = async () => {
    if (selected) {
      startTransition(async () => {
        setOptimisticHabits({ type: "delete", id: selected.id });
      });
      await deleteHabit(selected.id);
    }
  };

  const onEdit = (habit: Habit) => {
    setSelected(habit);
    setFormDialogOpen(true);
  };

  const onSave = async (value: HabitFormValue) => {
    setFormDialogOpen(false);

    startTransition(async () => {
      if (selected) {
        setOptimisticHabits({
          type: "update",
          habit: {
            ...selected,
            ...value,
          },
        });
      } else {
        setOptimisticHabits({
          type: "add",
          habit: {
            id: new Date().getTime(),
            userId: props.userId,
            created_at: new Date(),
            ...value,
          },
        });
      }
    });

    if (selected) {
      await updateHabit(selected.id, value);
    } else {
      await addHabit(props.userId, value);
    }
  };

  return (
    <>
      <HabitFormDialog
        habit={selected}
        open={formDialogOpen}
        onOpenChange={onFormDialogOpenChange}
        onSave={onSave}
      />

      <HabitDeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onConfirm={onDeleteConfirm}
      />

      <div className="flex flex-col gap-4">
        {optimisticHabits.length === 0 && (
          <div className="flex flex-col gap-4 text-gray-600">
            <p>{"You haven't added any habits to track yet."}</p>

            <Button
              className="self-start"
              onClick={() => setFormDialogOpen(true)}
            >
              Start by adding your first habit
            </Button>
          </div>
        )}

        {optimisticHabits.length > 0 && (
          <>
            <Button
              className="self-end mr-4"
              onClick={() => setFormDialogOpen(true)}
            >
              Add
            </Button>
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-24 text-right pr-4">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {optimisticHabits.map((habit) => (
                  <TableRow key={habit.id}>
                    <TableCell>{habit.title}</TableCell>
                    <TableCell className="w-24 text-right pr-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(habit)}
                      >
                        <Edit />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteHabit(habit)}
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </>
  );
}
