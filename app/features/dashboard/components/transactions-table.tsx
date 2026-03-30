import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  formatTransactionDateTime,
  getTransactionAmountColor,
  getTransactionStatusColor,
  getTransactionTypeColor,
} from '@/lib/transaction-utils';
import { cn, formatCurrency } from '@/lib/utils';
import { Transaction } from '@/types';
import { useAccountStore } from '@/store/account-store';
import { ArrowDown02Icon, ArrowUp02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export function TransactionsTable({
  transactions,
  isLoading = false,
}: {
  transactions: Transaction[];
  isLoading?: boolean;
}) {
  const currentAccount = useAccountStore((state) => state.currentAccount);
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
              <TableHead className="">Amount</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Date & Time</TableHead>
              <TableHead>Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="w-24 h-4" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-16 h-6 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-24 h-6" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-16 h-6 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-32 h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-20 h-4" />
                    </TableCell>
                  </TableRow>
                ))
              : transactions.slice(0, 5).map((tx) => (
                  <TableRow className="h-15 " key={tx.transactionRef}>
                    <TableCell className="font-medium text-foreground text-ellipsis">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center">
                          {tx.destinationAccountId === currentAccount?.id ? (
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
                        Alex Thompson
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          getTransactionTypeColor(
                            tx.destinationAccountId !== currentAccount?.id
                              ? 'credit'
                              : 'debit',
                          ),
                        )}
                      >
                        {tx.destinationAccountId !== currentAccount?.id
                          ? 'Credit'
                          : 'Debit'}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={cn(
                        'font-semibold tracking-tight',
                        getTransactionAmountColor(
                          tx.destinationAccountId !== currentAccount?.id
                            ? 'credit'
                            : 'debit',
                        ),
                      )}
                    >
                      {tx.destinationAccountId !== currentAccount?.id
                        ? '+'
                        : '-'}{' '}
                      {formatCurrency(tx.amount, 'NGN')}
                    </TableCell>
                    <TableCell className="">
                      <Badge
                        className={cn(getTransactionStatusColor(tx.status))}
                      >
                        {tx.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {formatTransactionDateTime(tx.createdAt)}
                    </TableCell>
                    <TableCell className="capitalize text-muted-foreground">
                      {tx.transactionType}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
