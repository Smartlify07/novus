'use client';
import AccountSourceCard from '@/app/features/transfer/components/account-source-card';
import TransfersBreadcrumb from '@/app/features/transfer/components/transfers-breadcrumb';
import TransfersStepper from '@/app/features/transfer/components/transfers-stepper';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const Steps = {
  EnterRecipient: 1,
  EnterAmount: 2,
  ReviewTransfer: 3,
  Success: 4,
};
export default function TranferPage() {
  const [step, setStep] = useState(Steps.EnterRecipient);
  const stepTitle =
    step === Steps.EnterRecipient
      ? 'Enter Recipient'
      : step === Steps.EnterAmount
        ? 'Enter Amount'
        : step === Steps.ReviewTransfer
          ? 'Review Transfer'
          : '';
  return (
    <div className="p-6 flex flex-col gap-6">
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
        <Button onClick={() => setStep((prev) => prev + 1)}>Next</Button>
      </div>
    </div>
  );
}
