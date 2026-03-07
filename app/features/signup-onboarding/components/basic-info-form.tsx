'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Controller } from 'react-hook-form';

import { OnboardingSteps } from '../../auth/components/signup-form';
import { OnboardingFormProps } from '../types';
import { Input } from '@/components/ui/input';

export function BasicInfoForm({
  control,
  form,
  setCurrentStep,
}: OnboardingFormProps) {
  return (
    <>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{"Let's get you set up"}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your details to create your account.
          </p>
        </div>

        <FieldGroup>
          <Controller
            name="firstName"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field: firstNameField, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <label
                        className="text-sm font-medium"
                        htmlFor="firstName"
                      >
                        First name
                      </label>
                      <Input
                        {...firstNameField}
                        placeholder="Enter your first name"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError>{fieldState?.error?.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </Field>
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field: lastNameField, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <label className="text-sm font-medium" htmlFor="lastName">
                  Last name
                </label>
                <Input
                  {...lastNameField}
                  placeholder="Enter your last name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError>{fieldState?.error?.message}</FieldError>
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <label className="text-sm font-medium" htmlFor="email">
                Email address
              </label>
              <Input
                {...field}
                type="email"
                placeholder="Enter your email address"
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
              'firstName',
              'lastName',
              'email',
            ]);
            if (isValid) {
              setCurrentStep(OnboardingSteps.PersonalInfo);
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
