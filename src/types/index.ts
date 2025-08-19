export type SessionData = {
  id: number;
  name: string;
};

export type SessionPayload = SessionData & {
  expiresAt: Date;
};

export type Habit = {
  id: number;
  userId: number;
  title: string;
  description: string;
  updated_at?: Date | null;
  created_at: Date;
  deleted_at?: Date | null;
};

export type HabitFormValue = {
  title: string;
  description: string;
};

export type UserDailyHabit = {
  id: number;
  title: string;
  completed_at?: Date | null;
};
