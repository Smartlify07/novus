'use client';
import Header from '@/app/features/loans/loan-application/components/header';
import Stepper, {
  Connector,
  StepContent,
  StepGroup,
  StepLabel,
  StepTrigger,
} from '@/app/features/loans/loan-application/components/stepper';
import { cn } from '@/lib/utils';
import { Check } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';

const steps = [
  {
    id: 1,
    label: 'Type',
    value: 'type',
  },
  { id: 2, label: 'Amount', value: 'amount' },
  { id: 3, label: 'Term', value: 'term' },
  { id: 4, label: 'Purpose', value: 'purpose' },
  {
    id: 5,
    label: 'Review',
    value: 'review',
  },
];
export default function LoanApplicationPage() {
  const [step, setStep] = useState({
    value: steps[0].value,
    id: steps[0].id,
  });

  return (
    <div className="py-10 px-6 flex flex-col gap-10">
      <Header />
      <Stepper className="max-w-xl" defaultValue={step.value}>
        <div className="flex items-center gap-2">
          {steps.map((item, index) => (
            <StepGroup key={item.id} className="flex-row items-center gap-1">
              <div className="flex flex-col gap-1 items-center">
                <StepTrigger
                  variant={
                    item.id === step.id
                      ? 'active'
                      : item.id < step.id
                        ? 'success'
                        : 'default'
                  }
                  onClick={() => {
                    setStep(item);
                    console.log('click');
                  }}
                  value={item.value}
                >
                  {item.id >= step.id && index + 1}
                  {item.id < step.id && <HugeiconsIcon icon={Check} />}
                </StepTrigger>
                <StepLabel
                  className={cn(item.id === step.id && 'text-primary')}
                >
                  {item.label}
                </StepLabel>
              </div>
              {index !== steps.length - 1 && (
                <Connector
                  className={cn(
                    'w-24',
                    item.id === step.id
                      ? 'bg-primary'
                      : item.id < step.id
                        ? 'bg-foreground'
                        : '',
                  )}
                  value={item.value}
                ></Connector>
              )}
            </StepGroup>
          ))}
        </div>
        <StepContent value="type">Type of loan</StepContent>
        <StepContent value="amount">Amount</StepContent>
        <StepContent value="term">Term</StepContent>
        <StepContent value="purpose">Purpose</StepContent>
        <StepContent value="review">Review</StepContent>
      </Stepper>
    </div>
  );
}
