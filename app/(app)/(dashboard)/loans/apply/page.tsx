'use client';
import Header from '@/app/features/loans/loan-application/components/header';
import LoanAmountStep from '@/app/features/loans/loan-application/components/loan-amount-step';
import LoanTypeStep from '@/app/features/loans/loan-application/components/loan-type-step';
import RepaymentPeriodStep from '@/app/features/loans/loan-application/components/repayment-period-step';
import PurposeStep from '@/app/features/loans/loan-application/components/purpose-step';
import ReviewStep from '@/app/features/loans/loan-application/components/review-step';
import Stepper, {
  Connector,
  StepContent,
  StepGroup,
  StepLabel,
  StepTrigger,
  useStepper,
} from '@/app/features/loans/loan-application/components/stepper';
import { cn } from '@/lib/utils';
import { Check } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

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

function StepperNav() {
  const { step } = useStepper();
  const currentStepId = step?.id ?? 1;
  return (
    <div className="flex items-center gap-2 max-w-xl">
      {steps.map((item, index) => (
        <StepGroup key={item.id} className="flex flex-row items-center gap-1">
          <div className="flex flex-col gap-1 items-center">
            <StepTrigger stepId={item.id} value={item.value}>
              {item.id === currentStepId && index + 1}
              {item.id < currentStepId && <HugeiconsIcon icon={Check} />}
              {item.id > currentStepId && index + 1}
            </StepTrigger>
            <StepLabel
              className={cn(item.id === currentStepId && 'text-primary')}
            >
              {item.label}
            </StepLabel>
          </div>
          {index !== steps.length - 1 && (
            <Connector className="min-w-20 flex-1" stepId={item.id} />
          )}
        </StepGroup>
      ))}
    </div>
  );
}

export default function LoanApplicationPage() {
  return (
    <div className="py-10 px-6 flex flex-col gap-10">
      <Header />
      <Stepper
        className="max-w-xl flex flex-col gap-10"
        defaultValue={steps[0]}
      >
        <StepperNav />
        <StepContent stepId={1} value="type">
          <LoanTypeStep />
        </StepContent>
        <StepContent stepId={2} value="amount">
          <LoanAmountStep />
        </StepContent>
        <StepContent stepId={3} value="term">
          <RepaymentPeriodStep />
        </StepContent>
        <StepContent stepId={4} value="purpose">
          <PurposeStep />
        </StepContent>
        <StepContent stepId={5} value="review">
          <ReviewStep />
        </StepContent>
      </Stepper>
    </div>
  );
}
