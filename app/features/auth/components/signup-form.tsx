'use client';
import { cn } from '@/lib/utils';

import { MobileNumberForm } from '../../signup-onboarding/components/phone-number-form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  SignupFormValues,
  signupOnboardingSchema,
} from '../../signup-onboarding/schema';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { FirstnameForm } from '../../signup-onboarding/components/firstname-form';
import { OtpForm } from '../../signup-onboarding/components/otp-form';
import { PasswordForm } from '../../signup-onboarding/components/password-form';
import { OnboardingFormProps } from '../../signup-onboarding/types';
import { ConfirmPasscodeForm } from '../../signup-onboarding/components/confirm-passcode-form';
import { postLogin, postSignUp } from '../api';

export const OnboardingSteps = {
  Phone_Number: 1,
  Firstname: 2,
  OTP_Verification: 3,
  Passcode: 4,
  ConfirmPasscode: 5,
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
          <FirstnameForm
            form={form}
            setCurrentStep={setCurrentStep}
            control={form.control}
          />
        );
      case OnboardingSteps.OTP_Verification:
        return (
          <OtpForm
            form={form}
            setCurrentStep={setCurrentStep}
            control={form.control}
          />
        );
      case OnboardingSteps.Passcode:
        return (
          <PasswordForm
            form={form}
            setCurrentStep={setCurrentStep}
            control={form.control}
          />
        );
      case OnboardingSteps.ConfirmPasscode:
        return (
          <ConfirmPasscodeForm
            form={form}
            setCurrentStep={setCurrentStep}
            control={form.control}
          />
        );
      default:
        return <>No Screen</>;
    }
  };
  const onSubmit = async (values: SignupFormValues) => {
    await form.trigger();
    if (!form.formState.isValid) {
      const res = await postSignUp(values);
      console.log(res);
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
