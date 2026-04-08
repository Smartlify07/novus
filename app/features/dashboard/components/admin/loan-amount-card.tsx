import { Card } from '@/components/ui/card';
import { Loan } from '@/types';
import { UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export function LoanAmountCard({ loan }: { loan: Loan }) {
  return (
    <Card className="bg-primary/5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h4>
            <HugeiconsIcon icon={UserIcon} />
            {loan.loanType}
          </h4>
        </div>
      </div>
    </Card>
  );
}
