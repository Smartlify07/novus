'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { useStepper } from './stepper';
import { useLoanApplicationWorkflowStore } from '@/store/loan-application-workflow-store';
import {
  calculateInterest,
  calculateMonthlyPayment,
  calculateTotalRepayableAmount,
} from '@/lib/loan-utils';
import { formatCurrency } from '@/lib/utils';

export default function ReviewStep() {
  const stepper = useStepper();
  const store = useLoanApplicationWorkflowStore();
  const loanType = store.loanType;
  const principalAmount = store.principalAmount ?? 0;
  const termMonths = store.termMonths ?? 12;

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

  return (
    <Card className="p-6 max-w-xl flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <CardTitle className="text-2xl tracking-tighter">
          Review your application
        </CardTitle>
        <CardDescription className="tracking-tight">
          Confirm all details before submitting
        </CardDescription>
      </div>

      <Card className="p-6 flex flex-col gap-4 bg-primary/5">
        <div className="flex flex-col gap-2">
          <CardDescription className="text-sm uppercase tracking-tight">
            {formatLoanType(loanType)} Loan
          </CardDescription>
          <CardTitle className="text-5xl tracking-tighter">
            {formatCurrency(principalAmount, 'NGN')}
          </CardTitle>
        </div>

        <CardFooter className="bg-transparent border-t-0 rounded-none px-0 pt-0 grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground tracking-tight">Term</p>
            <p className="text-base font-medium tracking-tight">
              {termMonths} months
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Monthly</p>
            <p className="text-base font-medium tracking-tight">
              {formatCurrency(monthlyPayment, 'NGN')}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Rate</p>
            <p className="text-base font-medium tracking-tight">
              {interestRate}%
            </p>
          </div>
        </CardFooter>
      </Card>

      <Card className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-3 border-b">
          <p className="text-sm text-muted-foreground">Principal</p>
          <p className="text-sm text-foreground">
            {formatCurrency(principalAmount, 'NGN')}
          </p>
        </div>
        <div className="flex items-center justify-between pb-3 border-b">
          <p className="text-sm text-muted-foreground">Total Interest</p>
          <p className="text-sm text-foreground">
            {formatCurrency(totalInterest, 'NGN')}
          </p>
        </div>
        <div className="flex items-center justify-between font-bold">
          <p className="text-sm text-foreground">Total Repayable</p>
          <p className="text-sm text-primary">
            {formatCurrency(totalRepayable, 'NGN')}
          </p>
        </div>
      </Card>

      <CardFooter className="bg-card rounded-none px-0 flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Step <span className="text-foreground">5</span> of 5
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant={'outline'}
            onClick={() => {
              stepper.onChange({ id: 4, value: 'purpose' });
            }}
          >
            Back
          </Button>
          <Button variant={'default'}>Continue</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
