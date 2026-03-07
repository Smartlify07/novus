'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Controller } from 'react-hook-form';
import { HugeiconsIcon } from '@hugeicons/react';
import { EyeIcon, ViewOffIcon } from '@hugeicons/core-free-icons';

import { OnboardingFormProps } from '../types';
import { Input } from '@/components/ui/input';

export function SecurityForm({
  control,
  form,
}: Omit<OnboardingFormProps, 'setCurrentStep'>) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Secure your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Create a strong password to protect your account.
          </p>
        </div>

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  aria-invalid={fieldState.invalid}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <HugeiconsIcon
                    icon={showPassword ? ViewOffIcon : EyeIcon}
                    className="h-4 w-4 text-muted-foreground"
                  />
                </Button>
              </div>
              {fieldState.invalid && (
                <FieldError>{fieldState?.error?.message}</FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <label className="text-sm font-medium" htmlFor="confirmPassword">
                Confirm password
              </label>
              <div className="relative">
                <Input
                  {...field}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  aria-invalid={fieldState.invalid}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <HugeiconsIcon
                    icon={showConfirmPassword ? ViewOffIcon : EyeIcon}
                    className="h-4 w-4 text-muted-foreground"
                  />
                </Button>
              </div>
              {fieldState.invalid && (
                <FieldError>{fieldState?.error?.message}</FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <Field>
        <Button
          onClick={async () => {
            const isValid = await form.trigger(['password', 'confirmPassword']);
            if (isValid) {
              form.handleSubmit((data) => {
                console.log(data);
              })();
            }
          }}
          type="submit"
          className="w-full"
        >
          Create account
        </Button>
      </Field>
    </>
  );
}
