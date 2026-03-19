import { Slider } from '@/components/ui/slider';
import { useLoanApplicationWorkflowStore } from '@/store/loan-application-workflow-store';
import React, { useState } from 'react';

const MAX_AMOUNT = 10_000_000;
const MIN_AMOUNT = 50_000;
export default function LoanAmountSlider({
  onValueChange,
}: {
  onValueChange: (value: number[]) => void;
}) {
  const { principalAmount, setPrincipalAmount } =
    useLoanApplicationWorkflowStore();
  const [value, setValue] = useState([principalAmount || 50000]);
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
          setPrincipalAmount(value[0]);
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
