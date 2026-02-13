import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  formatTransactionDate,
  formatTransactionDateTime,
  getTransactionAmountColor,
  getTransactionStatusColor,
  getTransactionTypeColor,
} from '@/lib/transaction-utils';
import { cn } from '@/lib/utils';
import { Transaction } from '@/types';
import {
  ArrowDown01,
  ArrowDown02Icon,
  ArrowUp01,
  ArrowUp02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

export function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <Card className="gap-6 py-6">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/transactions">View All</Link>
        </Button>
      </CardHeader>
      <div className="px-4">
        <Table className="">
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Sender</TableHead>
              <TableHead className="">Type</TableHead>
              <TableHead className="w-[200px]">Amount</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.slice(0, 5).map((tx) => (
              <TableRow className="h-[60px] " key={tx.txRefrence}>
                <TableCell className="font-medium text-foreground text-ellipsis">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center">
                      {tx.type === 'credit' ? (
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
                    {tx.sender.name}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'w-max rounded-md font-medium capitalize px-2 py-1 flex items-center justify-center h-6 text-sm',
                      getTransactionTypeColor(tx.type),
                    )}
                  >
                    {tx.type === 'credit' ? 'Credit' : 'Debit'}
                  </span>
                </TableCell>
                <TableCell
                  className={cn(
                    'font-semibold tracking-tight',
                    getTransactionAmountColor(tx.type),
                  )}
                >
                  {tx.type === 'credit' ? '+' : '-'}{' '}
                  {tx.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'NGN',
                  })}
                </TableCell>
                <TableCell className="">
                  <span
                    className={cn(
                      getTransactionStatusColor(tx.status),
                      'w-max rounded-md font-medium capitalize px-2 py-1 flex items-center justify-center h-6 text-sm',
                    )}
                  >
                    {tx.status}
                  </span>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {formatTransactionDateTime(tx.createdAt)}
                </TableCell>
                <TableCell className="capitalize text-muted-foreground">
                  {tx.method}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
