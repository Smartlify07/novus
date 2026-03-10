'use client';

import { useMemo, useState } from 'react';
import {
  useTransferWorkflowStore,
  Steps,
  STEP_METADATA,
} from '@/store/transfer-workflow-store';
import { MAX_ACCT_NUMBER_LENGTH } from '@/lib/constants';
import AmountEntryStep from '@/app/features/transfer/components/amount-entry-step';
import EnterRecepientStep from '@/app/features/transfer/components/enter-recepient-step';
import ReviewTransferStep from '@/app/features/transfer/components/review-transfer-step';
import TransferSuccessStep from '@/app/features/transfer/components/transfer-success-step';
import TransfersBreadcrumb from '@/app/features/transfer/components/transfers-breadcrumb';
import TransfersStepper from '@/app/features/transfer/components/transfers-stepper';
import { Button } from '@/components/ui/button';
import { useAccountStore } from '@/store/account-store';
import { transferMoney } from '@/app/features/transactions/api';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';

export default function TranferPage() {
  const step = useTransferWorkflowStore((s) => s.step);
  const data = useTransferWorkflowStore((s) => s.data);
  const setStep = useTransferWorkflowStore((s) => s.setStep);
  const goToNextStep = useTransferWorkflowStore((s) => s.goToNextStep);
  const goToPreviousStep = useTransferWorkflowStore((s) => s.goToPreviousStep);
  const { currentAccount } = useAccountStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stepTitle = STEP_METADATA[step]?.title || '';

  const sourceAccountBalance = currentAccount?.balance ?? 0;
  const isRecipientStepValid = useMemo(
    () => data.destinationAccountNumber.length === MAX_ACCT_NUMBER_LENGTH,
    [data.destinationAccountNumber.length],
  );

  const isAmountValid = useMemo(
    () =>
      (data?.amount ?? 0) <= sourceAccountBalance && (data?.amount ?? 0) > 0,
    [data.amount, sourceAccountBalance],
  );

  const canContinue = useMemo(() => {
    if (step === Steps.EnterRecipient) return isRecipientStepValid;
    if (step === Steps.EnterAmount) return isAmountValid;
    if (step === Steps.ReviewTransfer) return true;
    return false;
  }, [step, isRecipientStepValid, isAmountValid]);

  const handleTransfer = async () => {
    try {
      setIsSubmitting(true);
      await transferMoney({
        sourceAccountId: data.sourceAccountId,
        destinationAccountNumber: data.destinationAccountNumber,
        amount: data.amount ?? 0,
        description: data.description,
      });
      setStep(Steps.Success);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Transfer failed';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case Steps.EnterRecipient:
        return <EnterRecepientStep />;
      case Steps.EnterAmount:
        return <AmountEntryStep />;
      case Steps.ReviewTransfer:
        return <ReviewTransferStep />;
      case Steps.Success:
        return <TransferSuccessStep />;
      default:
        return null;
    }
  };

  const getButtonLabel = () => {
    if (step === Steps.ReviewTransfer) {
      return `Send ${formatCurrency(data.amount ?? 0, 'NGN')}`;
    }
    return 'Continue';
  };

  const isReviewStep = step === Steps.ReviewTransfer;

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

      {step !== Steps.Success && (
        <div className="flex items-center justify-between mt-10">
          {step > 1 && (
            <Button
              variant={'outline'}
              className="w-30"
              onClick={goToPreviousStep}
              disabled={step === 1}
            >
              Back
            </Button>
          )}
          <Button
            className="w-30 ml-auto"
            onClick={isReviewStep ? handleTransfer : goToNextStep}
            disabled={!canContinue || isSubmitting}
          >
            {isSubmitting ? 'Sending...' : getButtonLabel()}
          </Button>
        </div>
      )}
    </div>
  );
}
