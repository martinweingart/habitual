"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { WeekHabitsCount } from "@/types";
import { useMemo } from "react";

function getChartData(weekDaysCount: WeekHabitsCount) {
  return weekDaysCount.map((day) => ({
    day: new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }),
    count: day.completed_count,
  }));
}

const chartConfig = {
  count: {
    label: "Habits",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type HabitWeekChartProps = {
  weekDaysCount: WeekHabitsCount;
  weekCount: number;
  prevWeekCount: number;
};

export function HabitWeekChart(props: HabitWeekChartProps) {
  const weekDiff = props.weekCount - props.prevWeekCount;
  const weekDiffPerc =
    props.prevWeekCount === 0
      ? props.weekCount === 0
        ? 0
        : 100
      : Math.round((weekDiff / props.prevWeekCount) * 100);
  const weekDiffStr = `${
    weekDiff !== 0 ? (weekDiff > 0 ? "+" : "-") : ""
  }${Math.abs(weekDiffPerc)}%`;

  const chartData = useMemo(
    () => getChartData(props.weekDaysCount),
    [props.weekDaysCount]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Habits Completed This Week</CardTitle>
        <CardDescription className="flex items-center gap-6">
          <span className="text-4xl">{props.weekCount}</span>
          <div className="flex gap-2">
            Last 7 days
            <div className="flex gap-1 text-lime-600">
              <span>{weekDiffStr}</span>
              {weekDiff > 0 && <TrendingUp className="h-4 w-4" />}
              {weekDiff < 0 && <TrendingDown className="h-4 w-4" />}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
