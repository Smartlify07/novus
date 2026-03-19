import { Slider } from '@/components/ui/slider';
import React, { useState } from 'react';

const MAX_AMOUNT = 10_000_000;
const MIN_AMOUNT = 50_000;
export default function LoanAmountSlider({
  onValueChange,
}: {
  onValueChange: (value: number[]) => void;
}) {
  const [value, setValue] = useState([50000]);
  console.log(value);
  return (
    <div className="flex flex-col gap-2">
      <Slider
        defaultValue={[500000]}
        min={50000}
        max={10000000}
        value={value}
        onValueChange={(value) => {
          setValue(value);
          onValueChange(value);
        }}
        step={100000}
      />

      <div className="flex items-center w-full justify-between [&>p]:text-muted-foreground [&>p]:text-xs">
        <p>₦{MIN_AMOUNT.toLocaleString()}</p>
        <p>₦{MAX_AMOUNT.toLocaleString()}</p>
      </div>
    </div>
  );
}
