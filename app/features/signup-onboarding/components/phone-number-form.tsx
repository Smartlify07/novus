import { PhoneInput } from '@/components/phone-input';
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
import { phoneSchema } from '../schema';

export function MobileNumberForm({
  control,
  form,
  setCurrentStep,
}: OnboardingFormProps) {
  return (
    <>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">What's your Phone Number?</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter the phone number you want to use for this account
          </p>
        </div>

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
              <PhoneInput
                {...field}
                defaultCountry="NG"
                placeholder="Enter your phone number"
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
            const currentValues = form.getValues();
            const result = phoneSchema.safeParse(currentValues);

            if (!result.success) {
              // If invalid, trigger RHF validation to show errors in UI
              await form.trigger('phone');
            } else {
              // If valid, move to next step
              setCurrentStep(OnboardingSteps.Firstname);
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
