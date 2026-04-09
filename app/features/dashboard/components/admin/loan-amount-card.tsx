import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn, formatCurrency } from '@/lib/utils';
import { Loan } from '@/types';
import { UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { format } from 'date-fns';

export function LoanAmountCard({ loan }: { loan: Loan }) {
  const status = loan.status;
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-sm">
            <HugeiconsIcon icon={UserIcon} size={16} />
            {loan.loanType}
          </div>
          <h4 className="text-muted-foreground text-xs">{loan.loanNumber}</h4>
        </div>

        <Badge
          className={cn(
            status === 'ACTIVE' &&
              'bg-green-600/5 border border-green-600 text-green-600',
            status === 'APPROVED' &&
              'bg-blue-600/5 border border-blue-600 text-blue-600',
            status === 'PENDING' &&
              'bg-yellow-600/5 border border-yellow-600 text-yellow-600',
            status === 'REJECTED' &&
              'bg-red-600/5 border border-red-600 text-red-600',
            status === 'CLOSED' && '',
          )}
          variant={'outline'}
        >
          <div
            className={cn(
              'rounded-full size-1',
              status === 'ACTIVE' && 'bg-green-600',
              status === 'PENDING' && 'bg-yellow-600',
              status === 'APPROVED' && 'bg-blue-600',
              status === 'REJECTED' && 'bg-red-600',
              status === 'CLOSED' && 'bg-foreground',
            )}
          />
          {status === 'ACTIVE'
            ? 'Active'
            : status === 'APPROVED'
              ? 'Approved'
              : status === 'CLOSED'
                ? 'Closed'
                : status === 'PENDING'
                  ? 'Pending review'
                  : 'Rejected'}
        </Badge>
      </CardHeader>

      <CardContent>
        <h1 className="text-5xl font-normal tracking-tighter">
          {formatCurrency(loan.principalAmount, 'NGN')}
        </h1>
      </CardContent>

      <CardFooter className="bg-transparent">
        <div className="grid grid-cols-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground tracking-tight">Term</p>
            <p className="text-base font-medium tracking-tight">
              {loan.termMonths} months
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground tracking-tight">Rate</p>
            <p className="text-base font-medium tracking-tight">
              {loan.interestRate} % / mo
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground tracking-tight">
              Monthly (est.)
            </p>
            <p className="text-base font-medium tracking-tight">
              {formatCurrency(loan.monthlyPayment, 'NGN')}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground tracking-tight">
              Applied
            </p>
            <p className="text-base font-medium tracking-tight">
              {format(loan.applicationDate, 'PPP')}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
