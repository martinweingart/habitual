"use client";

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

type HabitsTableProps = {
  habits: Habit[];
};

export function HabitsTable(props: HabitsTableProps) {
  return (
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
          {props.habits.map((habit) => (
            <TableRow key={habit.id}>
              <TableCell>{habit.title}</TableCell>
              <TableCell className="w-24 text-right pr-4">
                <Button variant="ghost" size="icon">
                  <Edit />
                </Button>

                <Button variant="ghost" size="icon">
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
