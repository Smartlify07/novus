'use client';
import Header from '@/app/features/loans/loan-application/components/header';
import LoanAmountStep from '@/app/features/loans/loan-application/components/loan-amount-step';
import LoanTypeStep from '@/app/features/loans/loan-application/components/loan-type-step';
import RepaymentPeriodStep from '@/app/features/loans/loan-application/components/repayment-period-step';
import Stepper, {
  Connector,
  StepContent,
  StepGroup,
  StepLabel,
  StepTrigger,
  useStepper,
} from '@/app/features/loans/loan-application/components/stepper';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
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

function PurposeStep() {
  const stepper = useStepper();
  return (
    <div className="max-w-xl flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl tracking-tighter font-semibold">What is the purpose of this loan?</h2>
        <p className="text-muted-foreground tracking-tight">Select the purpose that best describes your loan</p>
      </div>
      <CardFooter className="bg-card rounded-none px-0 flex items-center justify-between mt-6">
        <p className="text-muted-foreground text-sm">
          Step <span className="text-foreground">4</span> of 5
        </p>
        <div className="flex items-center gap-2">
          <Button variant={'outline'} onClick={() => {
            stepper.onChange({ id: 3, value: 'term' });
          }}>Back</Button>
          <Button variant={'default'} onClick={() => {
            stepper.onChange({ id: 5, value: 'review' });
          }}>Continue</Button>
        </div>
      </CardFooter>
    </div>
  );
}

function ReviewStep() {
  const stepper = useStepper();
  return (
    <div className="max-w-xl flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl tracking-tighter font-semibold">Review your loan application</h2>
        <p className="text-muted-foreground tracking-tight">Confirm all details before submitting</p>
      </div>
      <CardFooter className="bg-card rounded-none px-0 flex items-center justify-between mt-6">
        <p className="text-muted-foreground text-sm">
          Step <span className="text-foreground">5</span> of 5
        </p>
        <div className="flex items-center gap-2">
          <Button variant={'outline'} onClick={() => {
            stepper.onChange({ id: 4, value: 'purpose' });
          }}>Back</Button>
          <Button variant={'default'}>Submit Application</Button>
        </div>
      </CardFooter>
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
