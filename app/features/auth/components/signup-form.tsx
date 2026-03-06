'use client';
import { cn } from '@/lib/utils';
import { MobileNumberForm } from '../../signup-onboarding/components/phone-number-form';
import { SignupFormValues } from '../../signup-onboarding/schema';
import { FirstnameForm } from '../../signup-onboarding/components/firstname-form';
import { PasswordForm } from '../../signup-onboarding/components/password-form';
import { OnboardingFormProps } from '../../signup-onboarding/types';
import { ConfirmPasscodeForm } from '../../signup-onboarding/components/confirm-password-form';
import { postLogin, postSignUp } from '../api';
import { LastnameForm } from '../../signup-onboarding/components/lastname-form';
import { EmailForm } from '../../signup-onboarding/components/email-form';
import { AddressForm } from '../../signup-onboarding/components/address-form';
import { DateOfBirthForm } from '../../signup-onboarding/components/date-of-birth-form';
import { useRouter } from 'next/navigation';

export const OnboardingSteps = {
  Phone_Number: 1,
  Firstname: 2,
  Lastname: 3,
  Email: 4,
  Address: 5,
  DateOfBirth: 6,
  Password: 7,
  ConfirmPassword: 8,
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
  const renderForm = () => {
    switch (currentStep) {
      case OnboardingSteps.Phone_Number:
        return (
          <MobileNumberForm
            form={form}
            setCurrentStep={setCurrentStep}
            control={form.control}
          />
        );
      case OnboardingSteps.Firstname:
        return (
          <>
            <FirstnameForm
              form={form}
              setCurrentStep={setCurrentStep}
              control={form.control}
            />
          </>
        );

      case OnboardingSteps.Lastname:
        return (
          <>
            <LastnameForm
              form={form}
              setCurrentStep={setCurrentStep}
              control={form.control}
            />
          </>
        );
      case OnboardingSteps.Email:
        return (
          <>
            <EmailForm
              form={form}
              setCurrentStep={setCurrentStep}
              control={form.control}
            />
          </>
        );
      case OnboardingSteps.Address:
        return (
          <>
            <AddressForm
              form={form}
              setCurrentStep={setCurrentStep}
              control={form.control}
            />
          </>
        );
      case OnboardingSteps.DateOfBirth:
        return (
          <>
            <DateOfBirthForm
              form={form}
              setCurrentStep={setCurrentStep}
              control={form.control}
            />
          </>
        );

      case OnboardingSteps.Password:
        return (
          <PasswordForm
            form={form}
            setCurrentStep={setCurrentStep}
            control={form.control}
          />
        );
      case OnboardingSteps.ConfirmPassword:
        return (
          <ConfirmPasscodeForm
            form={form}
            setCurrentStep={setCurrentStep}
            control={form.control}
            onSubmit={onSubmit}
          />
        );
      default:
        return <>No Screen</>;
    }
  };

  const onSubmit = async (values: SignupFormValues) => {
    await form.trigger();
    if (form.formState.isValid) {
      const res = await postSignUp(values);
      await postLogin({
        password: values.password,
        email: values.email,
      });
      router.replace('/dashboard');
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
