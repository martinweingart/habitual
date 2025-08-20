import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type HabitStreakProps = {
  title: string;
  current_streak: number;
};

export function HabitStreak(props: HabitStreakProps) {
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 font-medium">
          Current streak: {props.current_streak} days
        </p>
      </CardContent>
    </Card>
  );
}
