'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { TrendingUp } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export const description = 'A multiple bar chart';

const chartData = [
  { month: 'January', income: 186, expenses: 80 },
  { month: 'February', income: 305, expenses: 200 },
  { month: 'March', income: 237, expenses: 120 },
  { month: 'April', income: 73, expenses: 190 },
  { month: 'May', income: 209, expenses: 130 },
  { month: 'June', income: 214, expenses: 140 },
];

const chartConfig = {
  income: {
    label: 'Income',
    color: 'var(--chart-1)',
  },
  expenses: {
    label: 'Expenses',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function CashFlowAnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Trend</CardTitle>
        <CardDescription>This Month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="min-h-[200px]" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          You've spent 12% less than last week.
          <HugeiconsIcon icon={TrendingUp} className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Your savings are growing!{' '}
        </div>
      </CardFooter>
    </Card>
  );
}
