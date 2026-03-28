'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useLoans } from '../../hooks';
import LoanRepaymentFlow from './loan-repayment-flow';

type LoanRepaymentPageProps = {
  loanId: number;
};

export default function LoanRepaymentPage({ loanId }: LoanRepaymentPageProps) {
  const { data, isLoading } = useLoans();
  const loan = data?.loans.find((item) => item.id === loanId);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner className="size-5" />
      </div>
    );
  }

  if (!loan || loan.status !== 'ACTIVE') {
    return (
      <div className="px-6 py-10">
        <div className="mx-auto flex max-w-xl flex-col gap-4 rounded-xl border bg-card p-6">
          <h1 className="text-2xl font-medium text-foreground">Loan unavailable</h1>
          <p className="text-sm text-muted-foreground">
            We could not find an active loan to repay from this link.
          </p>
          <Button asChild className="w-fit">
            <Link href="/loans">Return to loans</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <LoanRepaymentFlow loan={loan} />;
}
