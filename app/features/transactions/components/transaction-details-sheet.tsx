import React, { useState } from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Transaction } from '@/types';
import { cn, formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  formatTransactionDateTime,
  getTransactionAmountColor,
  getTransactionStatusColor,
} from '@/lib/transaction-utils';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Copy,
  Download01Icon,
  RefreshIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TransactionDetailsSheet({
  transaction,
}: {
  transaction: Transaction;
}) {
  const [notes, setNotes] = useState(transaction.notes ?? '');
  const router = useRouter();
  const counterpartyName =
    transaction.type === 'credit'
      ? transaction.sender.name
      : transaction.recepient.name;

  const descriptionText =
    transaction.type === 'credit' ? (
      <>
        Received money from{' '}
        <span className="font-semibold text-foreground">
          {transaction.sender.name}
        </span>
      </>
    ) : (
      <>
        Sent money to{' '}
        <span className="font-semibold text-foreground">
          {transaction.recepient.name}
        </span>
      </>
    );
  return (
    <div>
      <SheetContent className="data-[side=right]:sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">
            Transaction Details
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-8rem)] relative">
          <div className="flex flex-col gap-10 px-4 py-4">
            <div className="rounded-md ring ring-border p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full size-10 flex items-center justify-center bg-primary/5 text-primary">
                  {transaction.type === 'debit' ? (
                    <HugeiconsIcon icon={ArrowUpRight} />
                  ) : (
                    <HugeiconsIcon icon={ArrowDownLeft} />
                  )}
                </div>
                <p className="text-muted-foreground text-sm">
                  {descriptionText}
                </p>
              </div>
              <h1
                className={cn(
                  getTransactionAmountColor(transaction.type),
                  'text-xl font-semibold',
                )}
              >
                {transaction.type === 'credit' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </h1>
            </div>

            {/* Transaction details */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-foreground">
                Transaction Details
              </h2>
              <TransactionDetailItem>
                <TransactionDetailItem.Label>
                  Transaction Reference
                </TransactionDetailItem.Label>
                <TransactionDetailItem.Value>
                  {transaction.txRefrence}
                </TransactionDetailItem.Value>
                <TransactionDetailItem.Action>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => {
                      navigator.clipboard.writeText(transaction.txRefrence);
                      toast('Copied!');
                    }}
                  >
                    <HugeiconsIcon icon={Copy} size={14} />
                    <span className="sr-only">Copy transaction reference</span>
                  </Button>
                </TransactionDetailItem.Action>
              </TransactionDetailItem>

              <TransactionDetailItem>
                <TransactionDetailItem.Label>
                  Sender/Recipient
                </TransactionDetailItem.Label>
                <TransactionDetailItem.Value>
                  {counterpartyName}
                </TransactionDetailItem.Value>
              </TransactionDetailItem>

              <TransactionDetailItem>
                <TransactionDetailItem.Label>
                  Status
                </TransactionDetailItem.Label>
                <TransactionDetailItem.Value>
                  <Badge
                    className={cn(
                      getTransactionStatusColor(transaction.status),
                      'capitalize rounded-md',
                    )}
                  >
                    {transaction.status}
                  </Badge>
                </TransactionDetailItem.Value>
              </TransactionDetailItem>

              <TransactionDetailItem>
                <TransactionDetailItem.Label>Date</TransactionDetailItem.Label>
                <TransactionDetailItem.Value>
                  {formatTransactionDateTime(transaction.createdAt)}
                </TransactionDetailItem.Value>
              </TransactionDetailItem>
              {transaction.type === 'debit' && (
                <TransactionDetailItem>
                  <TransactionDetailItem.Label>
                    Our Fee
                  </TransactionDetailItem.Label>
                  <TransactionDetailItem.Value>
                    {formatCurrency(10, 'NGN')}{' '}
                  </TransactionDetailItem.Value>
                </TransactionDetailItem>
              )}
              <TransactionDetailItem>
                <TransactionDetailItem.Label>
                  Payment Method
                </TransactionDetailItem.Label>
                <TransactionDetailItem.Value className="capitalize">
                  <Badge
                    className={cn(
                      'capitalize rounded-md bg-blue-500/10 text-blue-500',
                    )}
                  >
                    {transaction.method}
                  </Badge>
                </TransactionDetailItem.Value>
              </TransactionDetailItem>
            </div>

            {/* Other details */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-foreground">
                Other Details
              </h2>
              <TransactionDetailItem>
                <TransactionDetailItem.Label>
                  Beneficiary Institution
                </TransactionDetailItem.Label>
                <TransactionDetailItem.Value>
                  {transaction.beneficiaryInstitution ?? 'N/A'}
                </TransactionDetailItem.Value>
              </TransactionDetailItem>

              <TransactionDetailItem>
                <TransactionDetailItem.Label>
                  Source Institution
                </TransactionDetailItem.Label>
                <TransactionDetailItem.Value>
                  {transaction.sourceInstitution ?? 'N/A'}
                </TransactionDetailItem.Value>
              </TransactionDetailItem>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-foreground">Notes</Label>
              <Textarea
                placeholder="What was this for? (e.g Dinner with the crew)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                variant={transaction.type === 'debit' ? 'outline' : 'default'}
                className="flex-1"
                onClick={() => {
                  toast('Downloading receipt...');
                }}
              >
                <HugeiconsIcon icon={Download01Icon} size={16} />
                Download Receipt
              </Button>
              {transaction.type === 'debit' && (
                <Button className="flex-1" asChild>
                  <Link href={`/transactions/${transaction.id}`}>
                    <HugeiconsIcon icon={RefreshIcon} size={16} />
                    Repeat Transaction
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </div>
  );
}

type TransactionDetailItemProps = {
  children: React.ReactNode;
  className?: string;
};

type TransactionDetailItemSlotProps = {
  children: React.ReactNode;
  className?: string;
};

const TransactionDetailItem = ({
  children,
  className,
}: TransactionDetailItemProps) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>{children}</div>
  );
};

const TransactionDetailItemLabel = ({
  children,
  className,
}: TransactionDetailItemSlotProps) => {
  return (
    <Label className={cn('mr-auto text-sm text-muted-foreground', className)}>
      {children}
    </Label>
  );
};

const TransactionDetailItemValue = ({
  children,
  className,
}: TransactionDetailItemSlotProps) => {
  return (
    <div
      className={cn(
        'text-foreground text-right font-medium text-sm',
        className,
      )}
    >
      {children}
    </div>
  );
};

const TransactionDetailItemAction = ({
  children,
  className,
}: TransactionDetailItemSlotProps) => {
  return <div className={cn('flex items-center', className)}>{children}</div>;
};

TransactionDetailItem.Label = TransactionDetailItemLabel;
TransactionDetailItem.Value = TransactionDetailItemValue;
TransactionDetailItem.Action = TransactionDetailItemAction;
