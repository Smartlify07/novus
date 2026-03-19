'use client';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { HugeiconsIcon } from '@hugeicons/react';
import { Clock04Icon } from '@hugeicons/core-free-icons';
import { useLoanApplicationWorkflowStore } from '@/store/loan-application-workflow-store';
import { calculateMonthlyPayment } from '@/lib/loan-utils';
import { formatCurrency } from '@/lib/utils';

export default function ApplicationSuccess() {
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

  const formatLoanType = (type: string | null) => {
    if (!type) return '';
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  const loanRef = `LND-${Date.now().toString().slice(-8)}`;

  return (
    <div className="flex flex-col items-center py-10 px-6">
      <div className="flex flex-col items-center gap-6 max-w-lg w-full">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <HugeiconsIcon
              icon={Clock04Icon}
              size={80}
              className="text-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl tracking-tighter font-semibold">
              Application Submitted
            </h1>
            <p className="text-sm text-muted-foreground">
              We've received your application and it's now under review. You'll
              be notified within{' '}
              <span className="font-medium text-foreground">
                1–3 business days
              </span>{' '}
              once a decision has been made.
            </p>
          </div>
        </div>

        <Card className="w-full p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="gap-2">
              <HugeiconsIcon icon={Clock04Icon} size={14} />
              In review
            </Badge>
            <p className="text-xs text-muted-foreground">Ref: {loanRef}</p>
          </div>

          <Separator />

          <div className="flex flex-col">
            <div className="flex items-center justify-between py-2">
              <p className="text-sm text-muted-foreground">Loan type</p>
              <p className="text-sm text-foreground font-medium">
                {formatLoanType(loanType)} Loan
              </p>
            </div>
            <Separator />

            <div className="flex items-center justify-between py-2">
              <p className="text-sm text-muted-foreground">Amount requested</p>
              <p className="text-sm text-foreground font-medium">
                {formatCurrency(principalAmount, 'NGN')}
              </p>
            </div>
            <Separator />

            <div className="flex items-center justify-between py-2">
              <p className="text-sm text-muted-foreground">Repayment term</p>
              <p className="text-sm text-foreground font-medium">
                {termMonths} months
              </p>
            </div>
            <Separator />

            <div className="flex items-center justify-between py-2">
              <p className="text-sm text-muted-foreground">
                Est. monthly payment
              </p>
              <div className="flex items-center gap-1">
                <p className="text-sm text-foreground font-medium">
                  {formatCurrency(monthlyPayment, 'NGN')}
                </p>
                <p className="text-xs text-muted-foreground">if approved</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
