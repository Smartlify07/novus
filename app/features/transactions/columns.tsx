import {
  formatTransactionDateTime,
  getTransactionAmountColor,
  getTransactionStatusColor,
  getTransactionTypeColor,
} from '@/lib/transaction-utils';
import { cn, getTimeInMs } from '@/lib/utils';
import { Transaction } from '@/types';
import {
  ArrowDown02Icon,
  ArrowUp02Icon,
  MoreHorizontal,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
//if type is debit then show the receiver, else show the sender
const columnHelper = createColumnHelper<Transaction>();
const columns = [
  columnHelper.accessor(
    (row) => (row.type === 'credit' ? row.sender.name : row.recepient.name),
    {
      header: 'Record Name',
      id: 'record',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 font-medium text-foreground">
            <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center">
              {row.getValue('type') === 'credit' ? (
                <HugeiconsIcon
                  className="w-4 h-4"
                  icon={ArrowDown02Icon}
                  size={16}
                />
              ) : (
                <HugeiconsIcon
                  className="w-4 h-4"
                  icon={ArrowUp02Icon}
                  size={16}
                />
              )}
            </div>
            {row.original.type === 'credit'
              ? row.original.sender.name
              : row.original.recepient.name}
          </div>
        );
      },
    },
  ),
  columnHelper.accessor((row) => row.type, {
    header: 'Type',
    id: 'type',
    cell: ({ row }) => {
      return (
        <span
          className={cn(
            'w-max rounded-md font-medium capitalize px-2 py-1 flex items-center justify-center h-6 text-sm',
            getTransactionTypeColor(row.original.type),
          )}
        >
          {row.original.type === 'credit' ? 'Credit' : 'Debit'}
        </span>
      );
    },
  }),
  columnHelper.accessor((row) => row.amount, {
    header: 'Amount',
    id: 'amount',
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'font-semibold tracking-tight',
            getTransactionAmountColor(row.original.type),
          )}
        >
          {row.original.type === 'credit' ? '+' : '-'}{' '}
          {row.original.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'NGN',
          })}
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => row.status, {
    header: 'Status',
    id: 'status',
    cell: ({ row }) => {
      return (
        <span
          className={cn(
            getTransactionStatusColor(row.original.status),
            'w-max rounded-md font-medium capitalize px-2 py-1 flex items-center justify-center h-6 text-sm',
          )}
        >
          {row.original.status}
        </span>
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
      console.log(timeValues.txTime >= from || timeValues.txTime <= to);
      return timeValues.txTime >= from && timeValues.txTime <= to;
    },
  }),
  columnHelper.accessor((row) => row.method, {
    header: 'Method',
    id: 'method',
    cell: ({ row }) => {
      return (
        <div className="capitalize text-muted-foreground">
          {row.original.method}
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => row.id, {
    header: '',
    id: 'id',
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <HugeiconsIcon icon={MoreHorizontal} className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View transaction details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
export const transactionColumns = columns;
