'use client';
import { cn } from '@/lib/utils';
import { SignupFormValues } from '../../signup-onboarding/schema';
import { OnboardingFormProps } from '../../signup-onboarding/types';
import { BasicInfoForm } from '../../signup-onboarding/components/basic-info-form';
import { PersonalInfoForm } from '../../signup-onboarding/components/personal-info-form';
import { SecurityForm } from '../../signup-onboarding/components/security-form';
import { postLogin, postSignUp } from '../api';
import { useRouter } from 'next/navigation';

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

  const onSubmit = async (values: SignupFormValues) => {
    await form.trigger();
    if (form.formState.isValid) {
      await postSignUp(values);
      await postLogin({
        password: values.password,
        email: values.email,
      });
      router.replace('/dashboard');
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
