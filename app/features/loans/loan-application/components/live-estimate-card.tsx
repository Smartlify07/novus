import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateInterest,
  calculateMonthlyPayment,
  calculateTotalRepayableAmount,
} from "@/lib/loan-utils";
import { formatCurrency } from "@/lib/utils";
import React from "react";

export default function LiveEstimateCard({
  principalAmount,
  months = 12,
  title = "Live estimate",
}: {
  principalAmount: number;
  months?: number;
  title?: string;
}) {
  const monthly = calculateMonthlyPayment(principalAmount, 3.4, months);
  const total = calculateTotalRepayableAmount(principalAmount, 3.4, months);
  const interest = calculateInterest(principalAmount, 3.4, months);
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-xs tracking-tight uppercase">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 lg:grid-cols-3">
          <EstimateBlock label="Monthly" value={monthly} />
          <EstimateBlock label="Total" value={total} />
          <EstimateBlock label="Interest" value={interest} />
        </div>
      </CardContent>
    </Card>
  );
}

function EstimateBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-1 lg:flex-col lg:items-start">
      <p className="text-muted-foreground text-sm lg:text-xs">
        {label} <span className="lg:hidden">:</span>
      </p>
      <h3 className="text-base tracking-tighter lg:text-lg">
        {formatCurrency(value, "NGN")}
      </h3>
    </div>
  );
}
