import Link from 'next/link';

import { useStepper } from '@/app/features/loans/loan-application/components/stepper';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { REPAYMENT_STEPS, RepaymentStep } from '../types';

type LoanRepaymentActionsProps = {
  canContinue: boolean;
  isPending: boolean;
  onSubmit: () => Promise<boolean>;
};

export default function LoanRepaymentActions({
  canContinue,
  isPending,
  onSubmit,
}: LoanRepaymentActionsProps) {
  const { onChange, step } = useStepper();
  const currentStep = (step?.value ?? 'amount') as RepaymentStep;
  const currentIndex = REPAYMENT_STEPS.findIndex(
    (item) => item.value === currentStep,
  );
  const previousStep = REPAYMENT_STEPS[Math.max(currentIndex - 1, 0)];
  const nextStep =
    REPAYMENT_STEPS[Math.min(currentIndex + 1, REPAYMENT_STEPS.length - 1)];

  const handleSubmit = async () => {
    const submitted = await onSubmit();
    if (submitted) {
      onChange(REPAYMENT_STEPS[REPAYMENT_STEPS.length - 1]);
    }
  };

  if (currentStep === 'success') {
    return (
      <div className="flex items-center gap-3">
        <Button asChild variant="outline" className="flex-1">
          <Link href="/loans">Back to loans</Link>
        </Button>
        <Button asChild className="flex-1">
          <Link href="/loans/apply">Apply for another loan</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {currentStep === 'amount' ? (
        <Button asChild variant="outline" className="flex-1">
          <Link href="/loans">Cancel</Link>
        </Button>
      ) : (
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onChange(previousStep)}
          disabled={isPending}
        >
          Back
        </Button>
      )}
      <Button
        className="flex-1"
        disabled={(currentStep === 'amount' && !canContinue) || isPending}
        onClick={
          currentStep === 'review' ? handleSubmit : () => onChange(nextStep)
        }
      >
        {isPending && <Spinner />}
        {currentStep === 'review' ? 'Confirm payment' : 'Continue'}
      </Button>
    </div>
  );
}
