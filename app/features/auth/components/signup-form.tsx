'use client';
import { cn } from '@/lib/utils';
import { OnboardingFormProps } from '../../signup-onboarding/types';
import { BasicInfoForm } from '../../signup-onboarding/components/basic-info-form';
import { PersonalInfoForm } from '../../signup-onboarding/components/personal-info-form';
import { SecurityForm } from '../../signup-onboarding/components/security-form';
import { useCreateAccount } from '../../accounts/hooks';
import { useAccountStore } from '@/store/account-store';
import { startTransition, useActionState, useEffect } from 'react';
import { signUpAction } from '@/app/actions';

export const OnboardingSteps = {
  BasicInfo: 1,
  PersonalInfo: 2,
  Security: 3,
} as const;

export type OnboardingStep =
  (typeof OnboardingSteps)[keyof typeof OnboardingSteps];

type SignupFormProps = React.ComponentProps<'form'> & {
  setCurrentStep: React.Dispatch<React.SetStateAction<OnboardingStep>>;
  currentStep: OnboardingStep;
  form: OnboardingFormProps['form'];
};

export function SignupForm({
  className,
  currentStep,
  setCurrentStep,
  form,
  ...props
}: SignupFormProps) {
  const [state, formAction, pending] = useActionState(signUpAction, {
    message: null,
    errors: null,
  });

  const action: () => void = form.handleSubmit(async (data) => {
    form.clearErrors();

    let formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    startTransition(() => {
      formAction(formData);
    });
  });

  useEffect(() => {
    if (state?.errors) {
      form.setError('root', {
        type: 'custom',
        message: state.errors,
      });
    }
  }, [state]);

  const createAccount = useCreateAccount();
  const setCurrentAccount = useAccountStore((state) => state.setCurrentAccount);

  const renderForm = () => {
    switch (currentStep) {
      case OnboardingSteps.BasicInfo:
        return (
          <BasicInfoForm
            form={form}
            setCurrentStep={setCurrentStep}
            control={form.control}
          />
        );
      case OnboardingSteps.PersonalInfo:
        return (
          <PersonalInfoForm
            form={form}
            setCurrentStep={setCurrentStep}
            control={form.control}
          />
        );
      case OnboardingSteps.Security:
        return (
          <SecurityForm
            form={form}
            control={form.control}
            isSubmitting={pending}
          />
        );
      default:
        return <>No Screen</>;
    }
  };

  return (
    <>
      <form
        id="onboarding-form"
        action={action}
        // onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-6', className)}
        {...props}
      >
        {renderForm()}
      </form>
    </>
  );
}
