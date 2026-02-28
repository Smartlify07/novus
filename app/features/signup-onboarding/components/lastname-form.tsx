import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Controller } from 'react-hook-form';

import { OnboardingSteps } from '../../auth/components/signup-form';
import { OnboardingFormProps } from '../types';
import { Input } from '@/components/ui/input';

export function LastnameForm({
  control,
  form,
  setCurrentStep,
}: OnboardingFormProps) {
  return (
    <>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">What's your legal surname?</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your surname so we can personalize your account.
          </p>
        </div>

        <Controller
          name="lastName"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="lastName">Surname</FieldLabel>
              <Input
                {...field}
                placeholder="Enter your surname"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Field>
        <Button
          onClick={async () => {
            const isValid = await form.trigger('lastName');
            if (isValid) {
              setCurrentStep(OnboardingSteps.Email);
            }
          }}
          form="onboarding-form"
          type="button"
        >
          Continue
        </Button>
      </Field>
    </>
  );
}
