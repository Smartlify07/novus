'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Controller } from 'react-hook-form';

import { OnboardingSteps } from '../../auth/components/signup-form';
import { OnboardingFormProps } from '../types';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/date-picker-single';
import { PhoneInput } from '@/components/phone-input';

export function PersonalInfoForm({
  control,
  form,
  setCurrentStep,
}: OnboardingFormProps) {
  return (
    <>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Tell us about yourself</h1>
          <p className="text-muted-foreground text-sm text-balance">
            We need some additional details to complete your profile.
          </p>
        </div>

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <label className="text-sm font-medium" htmlFor="phoneNumber">
                Phone number
              </label>
              <PhoneInput
                {...field}
                placeholder="Enter your phone number"
                aria-invalid={fieldState.invalid}
                defaultCountry="NG"
              />
              {fieldState.invalid && (
                <FieldError>{fieldState?.error?.message}</FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <DatePicker
                label="Date of birth"
                value={field.value as string | undefined}
                onChange={field.onChange}
              />
              {fieldState.invalid && (
                <FieldError>{fieldState?.error?.message}</FieldError>
              )}
            </>
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <label className="text-sm font-medium" htmlFor="address">
                Address
              </label>
              <Input
                {...field}
                placeholder="Enter your address"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError>{fieldState?.error?.message}</FieldError>
              )}{' '}
            </Field>
          )}
        />
      </FieldGroup>
      <Field>
        <Button
          onClick={async () => {
            const isValid = await form.trigger([
              'phoneNumber',
              'dateOfBirth',
              'address',
            ]);
            if (isValid) {
              setCurrentStep(OnboardingSteps.Security);
            }
          }}
          form="onboarding-form"
          type="button"
          className="w-full"
        >
          Continue
        </Button>
      </Field>
    </>
  );
}
