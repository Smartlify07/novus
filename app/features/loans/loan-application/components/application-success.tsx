'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
          <div className="bg-primary/5 rounded-full size-20 flex items-center justify-center">
            <HugeiconsIcon
              icon={Clock04Icon}
              size={56}
              className="text-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl tracking-tight font-normal">
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
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="gap-2">
              <HugeiconsIcon icon={Clock04Icon} size={14} />
              In review
            </Badge>
            <p className="text-xs text-muted-foreground">Ref: {loanRef}</p>
          </div>

          <Separator className="data-[orientation=horizontal]:h-[0.5px]" />

          <div className="flex flex-col">
            <div className="flex items-center justify-between py-2">
              <p className="text-sm text-muted-foreground">Loan type</p>
              <p className="text-sm text-foreground font-medium">
                {formatLoanType(loanType)} Loan
              </p>
            </div>
            <Separator className="data-[orientation=horizontal]:h-[0.5px]" />

            <div className="flex items-center justify-between py-2">
              <p className="text-sm text-muted-foreground">Amount requested</p>
              <p className="text-sm text-foreground font-medium">
                {formatCurrency(principalAmount, 'NGN')}
              </p>
            </div>
            <Separator className="data-[orientation=horizontal]:h-[0.5px]" />

            <div className="flex items-center justify-between py-2">
              <p className="text-sm text-muted-foreground">Repayment term</p>
              <p className="text-sm text-foreground font-medium">
                {termMonths} months
              </p>
            </div>
            <Separator className="data-[orientation=horizontal]:h-[0.5px]" />

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

        <div className="w-full p-4 bg-primary/5 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            We may contact you for additional documents during the review
            process. Check your email and notifications for updates.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full">
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="default" className="flex-1" asChild>
            <Link href="/loans">View Loan Applications</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
