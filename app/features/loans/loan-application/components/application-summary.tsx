'use client';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLoanApplicationWorkflowStore } from '@/store/loan-application-workflow-store';
import {
  calculateInterest,
  calculateMonthlyPayment,
  calculateTotalRepayableAmount,
} from '@/lib/loan-utils';
import { formatCurrency } from '@/lib/utils';

export default function ApplicationSummary() {
  const store = useLoanApplicationWorkflowStore();
  const loanType = store.loanType;
  const principalAmount = store.principalAmount ?? 0;
  const termMonths = store.termMonths ?? 12;
  const purpose = store.purpose ?? '';

  const interestRate = 3.4;
  const monthlyPayment = calculateMonthlyPayment(
    principalAmount,
    interestRate,
    termMonths,
  );
  const totalInterest = calculateInterest(
    principalAmount,
    interestRate,
    termMonths,
  );
  const totalRepayable = calculateTotalRepayableAmount(
    principalAmount,
    interestRate,
    termMonths,
  );

  const formatLoanType = (type: string | null) => {
    if (!type) return '';
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  const overviewItems = [
    { label: 'Loan type', value: formatLoanType(loanType) },
    { label: 'Total interest', value: formatCurrency(totalInterest, 'NGN') },
    { label: 'Total repayable', value: formatCurrency(totalRepayable, 'NGN') },
    { label: 'Term', value: `${termMonths} months` },
    { label: 'Rate', value: `${interestRate}%/month` },
  ];

  return (
    <Card className="p-6 flex flex-col gap-6">
      <CardTitle className="text-sm uppercase">Application summary</CardTitle>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground">Principal amount</p>
        <CardTitle className="text-3xl tracking-tighter">
          {formatCurrency(principalAmount, 'NGN')}
        </CardTitle>
        <Separator />
      </div>

      <div className="flex flex-col gap-2 bg-primary/5 border border-primary rounded-lg p-4">
        <CardDescription className="text-xs uppercase">
          Est. monthly payment
        </CardDescription>
        <CardTitle className="text-xl tracking-tighter">
          {formatCurrency(monthlyPayment, 'NGN')}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          for {termMonths} months at {interestRate}%/mo.
        </CardDescription>
      </div>

      <div className="flex flex-col gap-3">
        {overviewItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="text-sm text-foreground font-medium">{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
