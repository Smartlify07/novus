'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCreateAccountStore } from '@/store/create-account-store';
import { SelectAccountType } from './select-account-type-card';
import InitialDepositStep from './initial-deposit-step';
import FundingSourceStep from './funding-source-step';
import ReviewCreateAccountStep from './review-create-account-step';
import { useTransition, useActionState } from 'react';
import { createAccountAction } from '../actions';
import { Spinner } from '@/components/ui/spinner';

export const TOTAL_STEPS = 4;

const stepTitles: Record<number, string> = {
  1: 'Choose your account type',
  2: 'Add initial deposit',
  3: 'Choose funding source',
  4: 'Review your account',
};

export default function CreateAccount() {
  const { step, data, goToNextStep, goToPreviousStep, setAccountType, reset } =
    useCreateAccountStore();
  const [isPending, startTransition] = useTransition();
  const [serverState, formAction] = useActionState(createAccountAction, {
    message: null,
    errors: null,
  });
  const title = stepTitles[step] || '';

  const combinedErrors: Record<string, string> = {
    ...(serverState?.errors || {}),
    ...(serverState?.message ? { root: serverState.message } : {}),
  } as Record<string, string>;

  const canContinue =
    step === 1
      ? data.accountType
      : step === 2
        ? data.initialDeposit
        : step === 3
          ? data.fundingSource
          : true;

  const handleNext = () => {
    if (step === TOTAL_STEPS) {
      handleSubmit();
    } else {
      goToNextStep();
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('accountType', data.accountType || '');
    formData.append('initialDeposit', String(data.initialDeposit || 0));
    formData.append('fundingSource', data.fundingSource || '');

    startTransition(() => {
      formAction(formData);
    });
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <SelectAccountType
            onSelect={(type) => {
              const accountTypeMap: Record<
                string,
                'SAVINGS' | 'CURRENT' | 'FIXED_DEPOSIT'
              > = {
                Savings: 'SAVINGS',
                Current: 'CURRENT',
                'Fixed Desposit': 'FIXED_DEPOSIT',
              };
              setAccountType(accountTypeMap[type] || 'SAVINGS');
            }}
            error={combinedErrors.accountType}
          />
        );
      case 2:
        return <InitialDepositStep error={combinedErrors.initialDeposit} />;
      case 3:
        return <FundingSourceStep error={combinedErrors.fundingSource} />;
      case 4:
        return <ReviewCreateAccountStep rootError={combinedErrors.root} />;
      default:
        return <>No Screen</>;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Link href="/" className="flex items-center gap-2 font-bold">
        <svg
          fill="none"
          height="48"
          viewBox="0 0 40 48"
          width="40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="m20 44c11.0457 0 20-8.9543 20-20s-8.9543-20-20-20c-11.04572 0-20 8.9543-20 20s8.95428 20 20 20zm6.2393-30.6832c.3037-1.0787-.7432-1.7167-1.6993-1.0355l-13.3469 9.5083c-1.0369.7387-.8738 2.2104.245 2.2104h3.5146v-.0272h6.8498l-5.5813 1.9693-2.4605 8.7411c-.3037 1.0788.7431 1.7167 1.6993 1.0355l13.3469-9.5082c1.0369-.7387.8737-2.2105-.245-2.2105h-5.3298z"
            fill="var(--primary)"
            fillRule="evenodd"
          />
        </svg>{' '}
        Novus
      </Link>
      <div className="flex flex-col gap-6 flex-1 items-center justify-center">
        <Header title={title} currentStep={step} />
        <div className="w-full flex flex-col gap-6 max-w-sm self-center">
          {renderForm()}
          <div className="flex flex-col gap-2 w-full">
            <Button
              type="button"
              onClick={handleNext}
              disabled={!canContinue || isPending}
              className="w-full"
            >
              {isPending ? (
                <Spinner />
              ) : step === TOTAL_STEPS ? (
                'Create Account'
              ) : (
                'Continue'
              )}
            </Button>

            {step > 1 && (
              <Button
                onClick={goToPreviousStep}
                variant={'outline'}
                className="w-full"
                disabled={isPending}
              >
                Back
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Header = ({
  title,
  currentStep,
}: {
  title: string;
  currentStep: number;
}) => {
  return (
    <div className="flex items-center gap-4 w-full max-w-sm">
      <h1 className="text-xl font-medium ">{title}</h1>

      <p className="text-muted-foreground text-sm">
        Step {currentStep} of {TOTAL_STEPS}
      </p>
    </div>
  );
};
