import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Loan } from '@/types';

type LoanRepaymentHeaderProps = {
  loan: Loan;
};

export default function LoanRepaymentHeader({
  loan,
}: LoanRepaymentHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Loan repayment
        </p>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl tracking-tight text-foreground">
            Repay active loan
          </h1>
          <p className="text-sm text-muted-foreground">
            Make a payment against loan <span className="font-medium">{loan.loanNumber}</span>.
          </p>
        </div>
      </div>
      <Button asChild variant="outline">
        <Link href="/loans">Back to loans</Link>
      </Button>
    </div>
  );
}
