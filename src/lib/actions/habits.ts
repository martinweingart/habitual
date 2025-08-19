"use server";

import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { habitsCompletion, habits } from "@/lib/db/schema";
import { HabitFormValue, UserDailyHabit } from "@/types";
import { revalidatePath } from "next/cache";

export async function getUserHabits(userId: number) {
  return await db
    .select()
    .from(habits)
    .where(eq(habits.userId, userId))
    .orderBy(habits.title);
}

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
    .where(eq(habits.userId, userId))
    .orderBy(habits.title);
}

export async function markCompleted(habitId: number) {
  await db.insert(habitsCompletion).values({
    habitId,
  });
  revalidatePath("/habits");
}

export async function markUncompleted(habitId: number) {
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

export async function markAllCompleted(userId: number) {
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

export async function addHabit(userId: number, value: HabitFormValue) {
  const habit = await db
    .insert(habits)
    .values([{ userId, ...value }])
    .returning();

  revalidatePath("/habits/manage");

  return habit;
}

export async function updateHabit(habitId: number, value: HabitFormValue) {
  await db.update(habits).set(value).where(eq(habits.id, habitId));
  revalidatePath("/habits/manage");
}

export async function deleteHabit(id: number) {
  await db.delete(habits).where(eq(habits.id, id));
  revalidatePath("/habits/manage");
}
