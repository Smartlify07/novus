'use client';
import {
  accounts,
  currentUserAccounts,
  transactions,
} from '@/app/features/dashboard/data/dummyTxs';
import AccountSourceCard from '@/app/features/transfer/components/account-source-card';
import AmountEntryStep from '@/app/features/transfer/components/amount-entry-step';
import RecentTransfers from '@/app/features/transfer/components/recent-transfers';
import RecepientReviewCard from '@/app/features/transfer/components/recepient-preview-card';
import RecepientsAccountInput from '@/app/features/transfer/components/recepients-account-input';
import TransfersBreadcrumb from '@/app/features/transfer/components/transfers-breadcrumb';
import TransfersStepper from '@/app/features/transfer/components/transfers-stepper';
import { TransferDataState } from '@/app/features/transfer/types';
import { Button } from '@/components/ui/button';
import { MAX_ACCT_NUMBER_LENGTH } from '@/lib/constants';
import { getRecentTransfers } from '@/lib/transaction-utils';
import { AccountWithUser } from '@/types';
import { useEffect, useState } from 'react';

const Steps = {
  EnterRecipient: 1,
  EnterAmount: 2,
  ReviewTransfer: 3,
  Success: 4,
};

const STEP_METADATA = {
  [Steps.EnterRecipient]: { title: 'Enter Recipient' },
  [Steps.EnterAmount]: { title: 'Enter Amount' },
  [Steps.ReviewTransfer]: { title: 'Review Transfer' },
  [Steps.Success]: { title: 'Success' },
};
export default function TranferPage() {
  const [step, setStep] = useState(Steps.EnterRecipient);
  const [data, setData] = useState<TransferDataState>({
    amount: 0,
    description: '',
    recepient: null,
    sourceAccountId: currentUserAccounts[0].id,
  });
  const [recepientVerificationStatus, setRecepientVerificationStatus] =
    useState<{
      success: boolean;
      error: boolean;
    }>({
      error: false,
      success: false,
    });

  const stepTitle =
    STEP_METADATA[step as keyof typeof STEP_METADATA]?.title || '';

  const handleSelectRecepient = (value: AccountWithUser) => {
    setStep(Steps.EnterAmount);
    setData((prev) => ({
      ...prev,
      recepient: value,
    }));
  };

  const updateRecipientAccount = (accountNumber: string) => {
    setData((prev) => ({
      ...prev,
      recepient: { ...prev.recepient!, accountNumber },
    }));
  };

  const updateVerificationStatus = (success: boolean, error: boolean) => {
    setRecepientVerificationStatus({
      error: error,
      success: success,
    });
  };
  const recentTransfers = getRecentTransfers(
    transactions,
    data.sourceAccountId,
  );

  const selectedAccount = currentUserAccounts.find(
    (account) => account.id === data.sourceAccountId,
  );
  const sourceAccountBalance =
    currentUserAccounts.find((account) => account.id === data.sourceAccountId)
      ?.balance ?? 0;
  const isRecipientStepValid =
    data.recepient?.accountNumber.length === MAX_ACCT_NUMBER_LENGTH &&
    recepientVerificationStatus.success;
  const isAmountValid = data.amount <= sourceAccountBalance;
  const canContinue =
    step === Steps.EnterRecipient
      ? isRecipientStepValid
      : step === Steps.EnterAmount
        ? isAmountValid
        : false;

  const renderStep = () => {
    switch (step) {
      case Steps.EnterRecipient:
        return (
          <>
            <AccountSourceCard
              selectedAccount={selectedAccount}
              accounts={currentUserAccounts}
              onSwitch={(account) =>
                setData((prev) => ({
                  ...prev,
                  sourceAccountId: account.id,
                }))
              }
            />
            <div className="flex flex-col gap-4">
              <RecepientsAccountInput
                initialValue={data.recepient?.accountNumber ?? ''}
                onChange={(value) => updateRecipientAccount(value)}
              />
              {(recepientVerificationStatus.error ||
                recepientVerificationStatus.success) && (
                <RecepientReviewCard
                  variant={
                    recepientVerificationStatus.success ? 'success' : 'error'
                  }
                  onConfirm={(value) => {
                    handleSelectRecepient(value);
                  }}
                  onChange={() => {
                    updateVerificationStatus(false, false);
                  }}
                  recepient={data.recepient}
                />
              )}
            </div>
            <RecentTransfers
              onSelect={(value) => handleSelectRecepient(value)}
              recentTransfers={recentTransfers}
            />
          </>
        );

      case Steps.EnterAmount:
        return (
          <AmountEntryStep
            sourceAccountBalance={sourceAccountBalance}
            recipient={data.recepient}
            onChange={(value) =>
              setData((prev) => ({ ...prev, amount: value }))
            }
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const accountNum = data.recepient?.accountNumber ?? '';
    if (accountNum.length !== MAX_ACCT_NUMBER_LENGTH) {
      updateVerificationStatus(false, false);
    } else {
      const accountFound = accounts.find(
        (account) => account.accountNumber === data.recepient?.accountNumber,
      );
      if (accountFound) {
        setData((prev) => ({
          ...prev,
          recepient: accountFound,
        }));
        updateVerificationStatus(true, false);
      } else {
        updateVerificationStatus(false, true);
      }
    }
  }, [data.recepient?.accountNumber]);
  return (
    <div className="p-6 flex flex-col gap-10 self-center w-3xl max-w-3xl">
      <div className="flex flex-col gap-4">
        <TransfersBreadcrumb currentStepTitle={stepTitle} />

        <h1 className="text-2xl font-semibold text-foreground">{stepTitle}</h1>

        <div className="flex items-center gap-2">
          <TransfersStepper onClick={() => setStep(Steps.EnterRecipient)} />
          <TransfersStepper
            onClick={() => setStep(Steps.EnterAmount)}
            disabled={step < 2}
          />
          <TransfersStepper
            onClick={() => setStep(Steps.ReviewTransfer)}
            disabled={step < 3}
          />
        </div>
      </div>

      <div className="flex flex-col gap-10">{renderStep()}</div>

      <div className="flex items-center justify-between mt-10">
        {step > 1 && (
          <Button
            variant={'outline'}
            className="w-30"
            onClick={() => setStep((prev) => prev - 1)}
            disabled={step === 1}
          >
            Back
          </Button>
        )}
        <Button
          className="w-30 ml-auto"
          onClick={() => setStep((prev) => prev + 1)}
          disabled={!canContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
