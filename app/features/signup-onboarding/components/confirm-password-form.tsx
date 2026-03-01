import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Controller } from 'react-hook-form';
import { OnboardingFormProps } from '../types';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { EyeIcon, EyeOff, LoaderCircle } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export function ConfirmPasscodeForm({
  control,
  form,
  onSubmit,
}: OnboardingFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Confirm your Password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Re-enter your password to confirm.
          </p>
        </div>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">
                Confirm password
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  aria-invalid={fieldState.invalid}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  <HugeiconsIcon
                    icon={showPassword ? EyeOff : EyeIcon}
                    className="size-5"
                  />
                </button>
              </div>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Field>
        <Button
          onClick={async () => {
            const isValid = await form.trigger('confirmPassword');
            const values = form.getValues();
            if (isValid) {
              onSubmit?.(values);
            }
          }}
          form="onboarding-form"
          type="submit"
        >
          {form.formState.isSubmitting ? 'Submitting...' : 'Sign up'}
        </Button>
      </Field>
    </>
  );
}
