import {
  formatTransactionDateTime,
  getTransactionAmountColor,
  getTransactionStatus,
  getTransactionStatusColor,
  getTransactionTypeColor,
  getAccountUser,
} from '@/lib/transaction-utils';
import { cn, formatCurrency, getTimeInMs } from '@/lib/utils';
import { Transaction } from '@/types';
import {
  ArrowDownLeft,
  ArrowUpRight,
  MoreHorizontal,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createColumnHelper } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { useTransactionDetails } from '@/app/providers/transaction-details-provider';
import { currentUser, currentUserAccounts } from '../dashboard/data/dummyTxs';
import { Badge } from '@/components/ui/badge';
//if type is debit then show the receiver, else show the sender
const columnHelper = createColumnHelper<Transaction>();
const columns = [
  columnHelper.accessor(
    (row) => {
      const user = getAccountUser(row.sourceAccountId);
      const username = `${user?.user?.firstName} ${user?.user?.lastName}`;
      return username;
    },
    {
      header: 'Record Name',
      id: 'record',
      cell: ({ row }) => {
        const user = getAccountUser(row.original.sourceAccountId);
        const status = getTransactionStatus(
          row.original.sourceAccountId,
          currentUserAccounts[0].id,
        );

        const username = `${user?.user?.firstName} ${user?.user?.lastName}`;
        return (
          <div className="flex items-center gap-2 font-medium text-foreground">
            <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center">
              {status === 'credit' ? (
                <HugeiconsIcon
                  className="w-4 h-4"
                  icon={ArrowDownLeft}
                  size={16}
                />
              ) : (
                <HugeiconsIcon
                  className="w-4 h-4"
                  icon={ArrowUpRight}
                  size={16}
                />
              )}
            </div>
            {username}
          </div>
        );
      },
    },
  ),
  columnHelper.accessor(
    (row) => {
      const status = getTransactionStatus(
        row.sourceAccountId,
        currentUserAccounts[0].id,
      );
      console.log(status);
      return status;
    },
    {
      header: 'Type',
      id: 'type',
      cell: ({ row }) => {
        const status = getTransactionStatus(
          row.original.sourceAccountId,
          currentUserAccounts[0].id,
        );
        return (
          <Badge
            className={cn(
              'w-max rounded-md font-medium capitalize px-2 py-1 flex items-center justify-center h-6 text-sm',
              getTransactionTypeColor(status),
            )}
          >
            {status === 'credit' ? 'Credit' : 'Debit'}
          </Badge>
        );
      },
    },
  ),
  columnHelper.accessor((row) => row.amount, {
    header: 'Amount',
    id: 'amount',
    cell: ({ row }) => {
      const status = getTransactionStatus(
        row.original.sourceAccountId,
        currentUserAccounts[0].id,
      );
      return (
        <div
          className={cn(
            'font-semibold tracking-tight',
            getTransactionAmountColor(status),
          )}
        >
          {status === 'credit' ? '+' : '-'}{' '}
          {formatCurrency(row.original.amount, 'NGN')}
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => row.status, {
    header: 'Status',
    id: 'status',
    cell: ({ row }) => {
      return (
        <Badge
          className={cn(
            getTransactionStatusColor(row.original.status),
            'w-max rounded-md font-medium  capitalize px-2 py-1 flex items-center justify-center h-6 text-sm',
          )}
        >
          {row.original.status}
        </Badge>
      );
    },
  }),
  columnHelper.accessor((row) => row.createdAt, {
    header: 'Date & Time',
    id: 'date',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
          {formatTransactionDateTime(row.original.createdAt)}
        </div>
      );
    },
    filterFn: (row, _, filterValue) => {
      const { to, from } = filterValue;
      const timeValues = {
        to: getTimeInMs(to),
        from: getTimeInMs(from),
        txTime: getTimeInMs(new Date(row.original.createdAt)),
      };
      return timeValues.txTime >= from && timeValues.txTime <= to;
    },
  }),
  columnHelper.accessor((row) => row.transactionType, {
    header: 'Method',
    id: 'method',
    cell: ({ row }) => {
      return (
        <div className="capitalize text-muted-foreground">
          {row.original.transactionType}
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => row.id, {
    header: '',
    id: 'id',
    cell: ({ row }) => {
      const payment = row.original;
      const router = useRouter();
      const { onUpdateId } = useTransactionDetails();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <HugeiconsIcon icon={MoreHorizontal} className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[180px]" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(payment.id))}
            >
              Copy transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <SheetTrigger
                onClick={() => {
                  onUpdateId(String(row.original.id));
                }}
              >
                View transaction details
              </SheetTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
export const transactionColumns = columns;
