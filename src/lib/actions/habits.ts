"use server";

import { revalidatePath } from "next/cache";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { habitsCompletion, habits } from "@/lib/db/schema";
import { HabitFormValue, UserDailyHabit, WeekHabitsCount } from "@/types";

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

export async function getUserStreaks(userId: number) {
  const result = await db.execute(sql`
    WITH dates AS (
      SELECT
        hc.habit_id,
        DATE(hc.completed_at) AS completed_date
      FROM habits_completion hc
      JOIN habits h ON hc.habit_id = h.id
      WHERE h.user_id = ${userId}
    ),
    gaps AS (
      SELECT
        habit_id,
        completed_date,
        LAG(completed_date) OVER (PARTITION BY habit_id ORDER BY completed_date) AS prev_date
      FROM dates
    ),
    groups AS (
      SELECT
        habit_id,
        completed_date,
        SUM(
          CASE
            WHEN prev_date IS NULL OR completed_date - prev_date > 1
            THEN 1 ELSE 0
          END
        ) OVER (PARTITION BY habit_id ORDER BY completed_date) AS group_id
      FROM gaps
    ),
    last_group AS (
      SELECT
        habit_id,
        MAX(group_id) AS max_group_id
      FROM groups
      GROUP BY habit_id
    )
    SELECT 
      h.id AS habit_id,
      h.title,
      COUNT(*) AS current_streak
    FROM groups g
    JOIN last_group lg
      ON g.habit_id = lg.habit_id AND g.group_id = lg.max_group_id
    JOIN habits h
      ON h.id = g.habit_id
    WHERE h.user_id = ${userId}
    GROUP BY h.id, h.title
    ORDER BY h.title;

  `);

  return result.rows;
}

export async function getWeekCompletion(userId: number) {
  const weekDaysCount = await db.execute(sql`
      SELECT
        gs.day::date AS date,
        COUNT(hc.id) AS completed_count
      FROM
        generate_series(
          CURRENT_DATE - INTERVAL '6 days',
          CURRENT_DATE,
          INTERVAL '1 day'
        ) AS gs(day)
      LEFT JOIN habits_completion hc
        ON DATE(hc.completed_at) = gs.day::date
      LEFT JOIN habits h
        ON hc.habit_id = h.id AND h.user_id = ${userId}
      GROUP BY gs.day
      ORDER BY gs.day;
  `);

  const weekCount = await db.execute(sql`
    SELECT COUNT(*) AS completed_count
    FROM habits_completion hc
    JOIN habits h ON hc.habit_id = h.id
    WHERE h.user_id = ${userId}
      AND DATE(hc.completed_at) >= CURRENT_DATE - INTERVAL '6 days'
      AND DATE(hc.completed_at) <= CURRENT_DATE;
  `);

  const prevWeekCount = await db.execute(sql`
    SELECT COUNT(*) AS completed_count
    FROM habits_completion hc
    JOIN habits h ON hc.habit_id = h.id
    WHERE h.user_id = ${userId}
      AND DATE(hc.completed_at) >= CURRENT_DATE - INTERVAL '7 days'
      AND DATE(hc.completed_at) <= CURRENT_DATE - INTERVAL '13 days';
  `);

  return {
    weekDaysCount: weekDaysCount.rows.map((r) => ({
      ...r,
      completed_count: Number(r.completed_count),
    })) as WeekHabitsCount,
    weekCount: Number(weekCount.rows[0].completed_count),
    prevWeekCount: Number(prevWeekCount.rows[0].completed_count),
  };
}
