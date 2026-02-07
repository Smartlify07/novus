import { Control, UseFormReturn } from 'react-hook-form';
import { SignupFormValues } from './schema';
import { Dispatch, SetStateAction } from 'react';
import { OnboardingStep } from '../auth/components/signup-form';
import { E164Number } from 'libphonenumber-js';

export type OnboardingFormProps = {
  control: Control<SignupFormValues>;
  setCurrentStep: Dispatch<SetStateAction<OnboardingStep>>;
  form: UseFormReturn<
    {
      firstName: string;
      phone: string;
      otp: string;
      passcode: string;
      confirmPasscode: string;
    },
    any,
    {
      firstName: string;
      phone: string;
      otp: string;
      passcode: string;
      confirmPasscode: string;
    }
  >;
  onSubmit?: () => void;
};
