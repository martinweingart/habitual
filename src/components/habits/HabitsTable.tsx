"use client";

import { startTransition, useOptimistic, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Habit } from "@/types";
import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { HabitDeleteConfirmDialog } from "./HabitDeleteConfirmDialog/HabitDeleteConfirmDialog";
import { deleteHabit } from "@/lib/actions";

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
  } else {
    return prevHabits;
  }
}

type HabitsTableProps = {
  habits: Habit[];
};

export function HabitsTable(props: HabitsTableProps) {
  const [optimisticHabits, setOptimisticHabits] = useOptimistic<
    Habit[],
    OptimisticAction
  >(props.habits, optimisticUpdate);
  const [selected, setSelected] = useState<Habit | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

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

  const onDeleteConfirm = async () => {
    if (selected) {
      startTransition(async () => {
        setOptimisticHabits({ type: "delete", id: selected.id });
      });

      await deleteHabit(selected.id);
    }
  };

  return (
    <>
      <HabitDeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onConfirm={onDeleteConfirm}
      />

      <div className="flex flex-col gap-4">
        <Button className="self-end mr-4">Add</Button>

        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-24 text-right pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {optimisticHabits.map((habit) => (
              <TableRow key={habit.id}>
                <TableCell>{habit.title}</TableCell>
                <TableCell className="w-24 text-right pr-4">
                  <Button variant="ghost" size="icon">
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
      </div>
    </>
  );
}
