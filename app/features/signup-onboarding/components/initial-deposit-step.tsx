'use client';
import { useState } from 'react';
import AmountInput from '@/app/features/transfer/components/amount-input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCreateAccountStore } from '@/store/create-account-store';

const DEPOSIT_PILLS = [1000, 5000, 10000, 25000, 50000];

type InitialDepositStepProps = {
  error?: string;
};

export default function InitialDepositStep({ error }: InitialDepositStepProps) {
  const { data, setInitialDeposit } = useCreateAccountStore();
  const [amount, setAmount] = useState<number | undefined>(data.initialDeposit);

  const accountTypeLabel = data.accountType
    ? data.accountType === 'SAVINGS'
      ? 'savings'
      : data.accountType === 'CURRENT'
        ? 'current'
        : 'fixed deposit'
    : 'new';

  const handleAmountChange = (values: { floatValue?: number }) => {
    const newAmount = values.floatValue as number | undefined;
    setAmount(newAmount);
    setInitialDeposit(newAmount);
  };

  const handlePillClick = (pillAmount: number) => {
    setAmount(pillAmount);
    setInitialDeposit(pillAmount);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-lg font-medium">Fund your new account</h2>
        <p className="text-muted-foreground text-sm">
          Add money to get started with your {accountTypeLabel} account
        </p>
      </div>

      <AmountInput
        onValueChange={handleAmountChange}
        isBalanceSufficient={true}
        initialValue={amount}
      />

      {error && <p className="text-sm text-destructive text-center">{error}</p>}

      <div className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground text-center">
          Quick select amount
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {DEPOSIT_PILLS.map((pillAmount) => (
            <Button
              key={pillAmount}
              variant="outline"
              size="sm"
              onClick={() => handlePillClick(pillAmount)}
              className={cn(
                'rounded-full px-4 h-9',
                amount === pillAmount &&
                  'bg-primary text-primary-foreground border-primary',
              )}
            >
              ₦{pillAmount.toLocaleString()}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
