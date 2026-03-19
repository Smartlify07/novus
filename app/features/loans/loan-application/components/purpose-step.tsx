'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useStepper } from './stepper';

const quickSelectItems = [
  'Housing',
  'Travel',
  'Medical',
  'Education',
  'Vehicle',
  'Debt Consolidation',
  'Business',
];

const MAX_CHARS = 500;

export default function PurposeStep() {
  const stepper = useStepper();
  const [value, setValue] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleQuickSelect = (item: string) => {
    setValue(item);
    setSelectedItem(item);
  };

  return (
    <Card className="p-6 max-w-xl flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <CardTitle className="text-2xl tracking-tighter">
          What is this Loan for?
        </CardTitle>
        <CardDescription className="tracking-tight">
          A brief description helps us process your application faster.
        </CardDescription>
      </div>

      <div className="flex flex-col gap-4">
        <Textarea
          placeholder="Describe briefly how you plan to use the funds"
          className="h-[200px] resize-none"
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              setValue(e.target.value);
            }
          }}
        />
        <span className="text-muted-foreground text-xs self-end">
          {value.length} of {MAX_CHARS} characters
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <CardDescription className="text-sm">Quick select</CardDescription>
        <div className="flex flex-wrap gap-2">
          {quickSelectItems.map((item) => (
            <Badge
              key={item}
              variant={selectedItem === item ? 'default' : 'outline'}
              className="cursor-pointer px-4 h-8 text-sm font-medium"
              onClick={() => handleQuickSelect(item)}
            >
              {item}
            </Badge>
          ))}
        </div>

        <CardFooter className="bg-card rounded-none px-0 flex items-center justify-between mt-6">
          <p className="text-muted-foreground text-sm">
            Step <span className="text-foreground">4</span> of 5
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant={'outline'}
              onClick={() => {
                stepper.onChange({ id: 3, value: 'term' });
              }}
            >
              Back
            </Button>
            <Button
              variant={'default'}
              onClick={() => {
                stepper.onChange({ id: 5, value: 'review' });
              }}
              disabled={value === ''}
            >
              Continue
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
