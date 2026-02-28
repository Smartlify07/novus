'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { HugeiconsIcon } from '@hugeicons/react';
import { Calendar01Icon } from '@hugeicons/core-free-icons';
import { OnboardingFormProps } from '../types';
import { OnboardingSteps } from '../../auth/components/signup-form';

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function DateOfBirthForm({
  control,
  form,
  setCurrentStep,
}: OnboardingFormProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [month, setMonth] = React.useState<Date | undefined>(undefined);
  const [value, setValue] = React.useState('');

  return (
    <>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">What's your date of birth?</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your date of birth to verify your account.
          </p>
        </div>

        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="date-of-birth">Date of Birth</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="date-of-birth"
                  value={value}
                  placeholder="Select your date of birth"
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setValue(e.target.value);
                    if (isValidDate(date)) {
                      setDate(date);
                      setMonth(date);
                      field.onChange(date);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setOpen(true);
                    }
                  }}
                />
                <InputGroupAddon align="inline-end">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <InputGroupButton
                        id="date-picker"
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Select date"
                      >
                        <span className="sr-only">Select date</span>
                        <HugeiconsIcon icon={Calendar01Icon} />
                      </InputGroupButton>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="end"
                      alignOffset={-8}
                      sideOffset={10}
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        month={month}
                        onMonthChange={setMonth}
                        onSelect={(date) => {
                          setDate(date);
                          setValue(formatDate(date));
                          field.onChange(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Field>
        <Button
          onClick={async () => {
            const isValid = await form.trigger('dateOfBirth');
            if (isValid) {
              setCurrentStep(OnboardingSteps.Password);
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
