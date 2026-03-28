import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import RepaymentMetric from './repayment-metric';

type RepaymentSummaryCardProps = {
  amount: string;
  label: string;
  metrics: Array<{ label: string; value: string }>;
};

export default function RepaymentSummaryCard({
  amount,
  label,
  metrics,
}: RepaymentSummaryCardProps) {
  return (
    <Card className="border-primary/10 bg-primary/5">
      <CardHeader className="gap-2">
        <CardDescription className="text-xs uppercase tracking-[0.16em]">
          {label}
        </CardDescription>
        <CardTitle className="text-4xl tracking-tight">{amount}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 pt-0">
        {metrics.map((metric) => (
          <RepaymentMetric
            key={metric.label}
            label={metric.label}
            value={metric.value}
          />
        ))}
      </CardContent>
    </Card>
  );
}
