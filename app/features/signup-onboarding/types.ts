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
      phoneNumber: string;
      firstName: string;
      lastName: string;
      password: string;
      dateOfBirth: unknown;
      email: string;
      address: string;
      confirmPassword: string;
    },
    unknown,
    {
      phoneNumber: string;
      firstName: string;
      lastName: string;
      password: string;
      dateOfBirth: unknown;
      email: string;
      address: string;
      confirmPassword: string;
    }
  >;
  onSubmit?: (values: SignupFormValues) => void;
};
