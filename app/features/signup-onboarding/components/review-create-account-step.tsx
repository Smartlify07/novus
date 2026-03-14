'use client';
import { useCreateAccountStore, AccountType } from '@/store/create-account-store';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  BankIcon,
  CreditCard as CreditCardIcon,
  WalletIcon,
} from '@hugeicons/core-free-icons';

const accountTypeLabels: Record<AccountType, string> = {
  SAVINGS: 'Savings Account',
  CURRENT: 'Current Account',
  FIXED_DEPOSIT: 'Fixed Deposit',
};

const fundingSourceLabels: Record<string, string> = {
  bank_transfer: 'Bank Transfer',
  card: 'Debit Card',
  existing_account: 'Existing Account',
};

const fundingSourceIcons: Record<string, typeof BankIcon> = {
  bank_transfer: BankIcon,
  card: CreditCardIcon,
  existing_account: WalletIcon,
};

export default function ReviewCreateAccountStep({ rootError }: { rootError?: string }) {
  const { data } = useCreateAccountStore();

  const accountTypeLabel = data.accountType
    ? accountTypeLabels[data.accountType]
    : 'Not selected';
  const fundingSourceLabel = data.fundingSource
    ? fundingSourceLabels[data.fundingSource]
    : 'Not selected';
  const fundingSourceIcon = data.fundingSource
    ? fundingSourceIcons[data.fundingSource]
    : WalletIcon;

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm self-center">
      {rootError && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          {rootError}
        </div>
      )}
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-lg font-medium">Review your account</h2>
        <p className="text-muted-foreground text-sm">
          Confirm the details before creating your account
        </p>
      </div>

      <Card className="bg-muted/50 rounded-md p-6">
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-muted-foreground text-sm">Initial Deposit</p>
            <p className="text-4xl font-semibold tracking-tight">
              {data.initialDeposit
                ? formatCurrency(data.initialDeposit, 'NGN')
                : '₦0.00'}
            </p>
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">Account Type</p>
              <p className="text-foreground font-medium">{accountTypeLabel}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">Funding Method</p>
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={fundingSourceIcon}
                  size={16}
                  strokeWidth={1.5}
                />
                <p className="text-foreground font-medium">
                  {fundingSourceLabel}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm text-center">
              Your new {accountTypeLabel} will be created with the amount above.
              You can add more funds anytime after creation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
