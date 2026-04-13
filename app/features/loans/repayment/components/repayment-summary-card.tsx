import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import RepaymentMetric from "./repayment-metric";

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
    <Card className="">
      <CardHeader className="gap-2">
        <CardDescription className="text-sm tracking-tight">
          {label}
        </CardDescription>
        <CardTitle className="text-2xl tracking-tight lg:text-4xl">
          {amount}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 border-t pt-4">
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
