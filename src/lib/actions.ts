"use server";

import { and, eq, sql } from "drizzle-orm";
import { db } from "./db";
import { habitsCompletion, habits } from "./db/schema";
import { UserDailyHabit } from "@/types";
import { revalidatePath } from "next/cache";

export async function getTodayHabits(
  userId: number
): Promise<UserDailyHabit[]> {
  return db
    .select({
      id: habits.id,
      title: habits.title,
      description: habits.description,
      completed_at: habitsCompletion.completedAt,
    })
    .from(habits)
    .leftJoin(
      habitsCompletion,
      and(
        eq(habits.id, habitsCompletion.habitId),
        eq(sql`DATE(${habitsCompletion.completedAt})`, sql`CURRENT_DATE`)
      )
    )
    .where(eq(habits.userId, userId));
}

export async function markCompleted(habitId: number): Promise<void> {
  await db.insert(habitsCompletion).values({
    habitId,
  });
  revalidatePath("/habits");
}

export async function markUncompleted(habitId: number): Promise<void> {
  await db
    .delete(habitsCompletion)
    .where(
      and(
        eq(habitsCompletion.habitId, habitId),
        eq(sql`DATE(${habitsCompletion.completedAt})`, sql`CURRENT_DATE`)
      )
    );
  revalidatePath("/habits");
}

export async function markAllCompleted(userId: number): Promise<void> {
  // Doesn't work as expected (#3608 drizzle bug)
  // await db
  //   .insert(habitCompletions)
  //   .select(
  //     db
  //       .select({ habitId: habits.id })
  //       .from(habits)
  //       .where(eq(habits.userId, userId))
  //   );

  // CHANGE this code when previous issue fixed
  await db.execute(
    sql`
      INSERT INTO habits_completion (habit_id)
      SELECT id FROM habits WHERE habits.user_id = ${userId}`
  );

  revalidatePath("/habits");
}
