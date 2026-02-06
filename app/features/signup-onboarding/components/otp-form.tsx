import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Controller } from 'react-hook-form';

import { OnboardingSteps } from '../../auth/components/signup-form';
import { OnboardingFormProps } from '../types';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export function OtpForm({
  control,
  form,
  setCurrentStep,
}: OnboardingFormProps) {
  return (
    <>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Verify Your Phone Number</h1>
          <p className="text-muted-foreground text-sm text-balance">
            We've sent a 6-digit code to ***{form.getValues('phone').slice(-4)}
          </p>
        </div>

        <Controller
          name="otp"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              orientation={'horizontal'}
              className="flex flex-col items-center"
            >
              <InputOTP
                aria-invalid={fieldState.invalid}
                maxLength={6}
                id="otp-verification"
                {...field}
                className="self-center"
              >
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot aria-invalid={fieldState.invalid} index={0} />
                  <InputOTPSlot aria-invalid={fieldState.invalid} index={1} />
                  <InputOTPSlot aria-invalid={fieldState.invalid} index={2} />
                  <InputOTPSlot aria-invalid={fieldState.invalid} index={3} />
                  <InputOTPSlot aria-invalid={fieldState.invalid} index={4} />
                  <InputOTPSlot aria-invalid={fieldState.invalid} index={5} />
                </InputOTPGroup>
              </InputOTP>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Field>
        <Button
          onClick={async () => {
            const isValid = await form.trigger('otp');

            if (isValid) {
              setCurrentStep(OnboardingSteps.Passcode);
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
