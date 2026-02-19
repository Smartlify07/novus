'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { addDays, format } from 'date-fns';
import { type DateRange } from 'react-day-picker';
import { HugeiconsIcon } from '@hugeicons/react';
import { Calendar03Icon } from '@hugeicons/core-free-icons';

export function DatePickerWithRange({
  setDateRange,
  label,
  onChange,
}: {
  label?: string;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  onChange?: (dateRange: DateRange | undefined) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <Field className="mx-auto w-60">
      {label && (
        <FieldLabel className="" htmlFor="date-picker-range">
          {label}
        </FieldLabel>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            className="justify-start px-2.5 font-normal"
          >
            <HugeiconsIcon icon={Calendar03Icon} data-icon="inline-start" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Select a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(date) => {
              setDateRange(date); // set external state
              setDate(date); // set internal state
              onChange?.(date);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
