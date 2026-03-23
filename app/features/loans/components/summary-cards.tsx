'use client';
import React from 'react';
import SummaryCard from '../../dashboard/components/summary-card';
import { useLoans } from '../hooks';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';

export default function SummaryCards() {
  const { data, isPending } = useLoans();
  const loans = data?.loans;
  const combinedMonthlyPayment = loans
    ?.filter((loan) => loan.status === 'ACTIVE')
    .reduce((prev, curr) => prev + curr.monthlyPayment, 0);
  const totalOutstanding = loans?.reduce((prev, curr) => {
    const outstanding = prev + curr.outstandingBalance;
    return outstanding;
  }, 0);
  const totalActiveLoans = loans?.filter(
    (loan) => loan.status === 'ACTIVE',
  ).length;
  const earliestMaturity = loans
    ?.filter((loan) => loan.status === 'ACTIVE')
    .sort(
      (a, b) =>
        new Date(a.maturityDate).getTime() - new Date(b.maturityDate).getTime(),
    )[0];
  return (
    <div className="grid grid-cols-3 gap-4">
      <SummaryCard
        title="Total Outstanding"
        value={formatCurrency(totalOutstanding ?? 0, 'NGN')}
        icon={null}
        isLoading={isPending}
      >
        <p className="text-muted-foreground">{totalActiveLoans} active loans</p>
      </SummaryCard>
      <SummaryCard
        title="Combined Monthly"
        value={formatCurrency(combinedMonthlyPayment ?? 0, 'NGN')}
        icon={null}
        isLoading={isPending}
      >
        <p className="text-muted-foreground">Across active loans</p>
      </SummaryCard>
      <SummaryCard
        title="Earliest maturity"
        value={
          earliestMaturity ? format(earliestMaturity.maturityDate, 'PPP') : ''
        }
        icon={null}
        isLoading={isPending}
      >
        <p className="text-amber-700">Final payment Date</p>
      </SummaryCard>
    </div>
  );
}
