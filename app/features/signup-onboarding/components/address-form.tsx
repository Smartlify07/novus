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

export function AddressForm({
  control,
  form,
  setCurrentStep,
}: OnboardingFormProps) {
  return (
    <>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">What's your address?</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your address for delivery and account verification.
          </p>
        </div>

        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                {...field}
                placeholder="Enter your address"
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
            const isValid = await form.trigger('address');
            if (isValid) {
              setCurrentStep(OnboardingSteps.DateOfBirth);
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
