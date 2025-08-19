import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { timestamps } from "./columns/helpers";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 20 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  avatarUrl: text(),
  ...timestamps,
});

export const habits = pgTable(
  "habits",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    title: varchar({ length: 120 }).notNull(),
    description: text(),
    ...timestamps,
  },
  (table) => [index("idx_habits_user_id").on(table.userId)]
);

export const habitsCompletion = pgTable(
  "habits_completion",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    habitId: integer()
      .references(() => habits.id, { onDelete: "cascade" })
      .notNull(),
    completedAt: timestamp().defaultNow(),
  },
  (table) => [
    index("idx_habit_completions_habit_id_completed_at").on(
      table.habitId,
      table.completedAt.desc()
    ),
  ]
);
