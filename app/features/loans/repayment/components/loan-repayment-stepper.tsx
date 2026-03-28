import { Check } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  Connector,
  StepGroup,
  StepLabel,
  StepTrigger,
  useStepper,
} from '@/app/features/loans/loan-application/components/stepper';
import { cn } from '@/lib/utils';
import { REPAYMENT_STEPS } from '../types';

export default function LoanRepaymentStepper() {
  const { step } = useStepper();
  const currentStepId = step?.id ?? REPAYMENT_STEPS[0].id;

  return (
    <div className="flex items-center gap-2">
      {REPAYMENT_STEPS.map((item, index) => (
        <StepGroup key={item.value} className="flex flex-row items-center gap-1">
          <div className="flex flex-col items-center gap-1">
            <StepTrigger stepId={item.id} value={item.value}>
              {item.id < currentStepId ? <HugeiconsIcon icon={Check} /> : item.id}
            </StepTrigger>
            <StepLabel className={cn(item.id === currentStepId && 'text-primary')}>
              {item.label}
            </StepLabel>
          </div>
          {index !== REPAYMENT_STEPS.length - 1 && (
            <Connector className="min-w-20 flex-1" stepId={item.id} />
          )}
        </StepGroup>
      ))}
    </div>
  );
}
