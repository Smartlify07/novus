'use client';
import { cn, getErrorMessage } from '@/lib/utils';
import { SignupFormValues } from '../../signup-onboarding/schema';
import { OnboardingFormProps } from '../../signup-onboarding/types';
import { BasicInfoForm } from '../../signup-onboarding/components/basic-info-form';
import { PersonalInfoForm } from '../../signup-onboarding/components/personal-info-form';
import { SecurityForm } from '../../signup-onboarding/components/security-form';
import { postLogin, postSignUp } from '../api';
import { createAccount } from '../../accounts/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';

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
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: SignupFormValues) => {
    await form.trigger();
    if (form.formState.isValid) {
      try {
        setIsSubmitting(true);
        await postSignUp(values);
        await postLogin({
          password: values.password,
          email: values.email,
        });
        await createAccount({
          accountType: 'SAVINGS',
          initialDeposit: 0,
        });
        router.replace('/dashboard');
      } catch (error) {
        console.error(error);
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

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
            isSubmitting={isSubmitting}
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
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-6', className)}
        {...props}
      >
        {renderForm()}
      </form>
    </>
  );
}
