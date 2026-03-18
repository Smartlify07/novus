import { Card, CardTitle } from '@/components/ui/card';
import {
  calculateInterest,
  calculateMonthlyPayment,
  calculateTotalRepayableAmount,
} from '@/lib/loan-utils';
import { formatCurrency } from '@/lib/utils';
import React from 'react';

export default function LiveEstimateCard({
  principalAmount,
}: {
  principalAmount: number;
}) {
  const monthly = calculateMonthlyPayment(principalAmount, 3.4, 12);
  const total = calculateTotalRepayableAmount(principalAmount, 3.4, 12);
  const interest = calculateInterest(principalAmount, 3.4, 12);

  return (
    <Card className="bg-primary/5">
      <CardTitle className="uppercase tracking-tight text-sm">
        Live estimate
      </CardTitle>

      <div className="grid grid-cols-3 gap-4">
        <EstimateBlock label="Monthly" value={monthly} />
        <EstimateBlock label="Total" value={total} />
        <EstimateBlock label="Interest" value={interest} />
      </div>
    </Card>
  );
}

function EstimateBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <h3 className="text-lg tracking-tighter">
        {formatCurrency(value, 'NGN')}
      </h3>
    </div>
  );
}
