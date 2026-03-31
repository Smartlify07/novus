'use client';
import { usePendingLoans } from '@/app/features/loans/hooks';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { Cancel, Tick } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { format } from 'date-fns';
import React from 'react';

export default function PendingLoansTable() {
  const { data, error, isPending } = usePendingLoans();
  const loans = data?.content ?? [];
  return (
    <Table>
      <TableHeader className="">
        <TableRow className="">
          <TableHead className="pl-4">Applicant</TableHead>
          <TableHead className="">Amount</TableHead>
          <TableHead className="">Type</TableHead>
          <TableHead className="">Applied</TableHead>
          <TableHead className="">Action</TableHead>
        </TableRow>
      </TableHeader>
      {loans.map((loan) => (
        <TableRow className=" last:border-b-0">
          <TableCell className="pl-4">
            <h4 className="font-medium">User user</h4>
            <h5 className="text-muted-foreground text-xs">{loan.loanNumber}</h5>
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
    </Table>
  );
}
