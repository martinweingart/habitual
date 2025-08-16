export interface UserDailyHabit {
  id: number;
  title: string;
  description: string | null;
  completed_at?: Date | null;
}
