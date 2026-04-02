'use client';
import { usePendingLoans } from '@/app/features/loans/hooks';
import InlineErrorStateCard from '@/components/inline-error-state-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { Alert, Cancel, Refresh, Tick } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { format } from 'date-fns';

export default function PendingLoansTable() {
  const { data, error, isPending } = usePendingLoans();
  const loans = data?.content ?? [];

  if (isPending) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableHead key={i} className="first:pl-4">
                <Skeleton className="h-4 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className=" last:border-b-0 ">
              <TableCell className="pl-4">
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>

              <TableCell className="">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-10" />
                  <Skeleton className="h-8 w-10" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  if (error) {
    return (
      <InlineErrorStateCard
        className="ring-0 py-10 "
        title="Couldn't load applications"
        description="The pending loan applications failed to load. Refresh the list to try again, no actions have been lost."
        actions={[{ label: 'Retry', icon: Refresh }]}
      />
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">Applicant</TableHead>
          <TableHead className="">Amount</TableHead>
          <TableHead className="">Type</TableHead>
          <TableHead className="">Applied</TableHead>
          <TableHead className="">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loans.map((loan) => (
          <TableRow key={loan.id} className="last:border-b-0">
            <TableCell className="pl-4">
              <h4 className="font-medium">User user</h4>
              <h5 className="text-muted-foreground text-xs">
                {loan.loanNumber}
              </h5>
            </TableCell>
            <TableCell className="">
              <h4 className="font-medium">
                {formatCurrency(loan.principalAmount, 'NGN')}
              </h4>
            </TableCell>
            <TableCell className="">
              <h4 className="font-medium text-muted-foreground">
                {loan.loanType}{' '}
              </h4>
            </TableCell>
            <TableCell className="">
              <h4 className="font-medium text-muted-foreground">
                {format(loan.applicationDate, 'EEEE, PPP')}{' '}
              </h4>
            </TableCell>
            <TableCell className="">
              <div className="flex items-center gap-2">
                <Button className="">
                  <HugeiconsIcon icon={Tick} />
                </Button>
                <Button className="" variant={'destructive'}>
                  <HugeiconsIcon icon={Cancel} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
