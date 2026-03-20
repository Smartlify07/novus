import { Slider } from '@/components/ui/slider';
import { useLoanApplicationWorkflowStore } from '@/store/loan-application-workflow-store';
import React, { useState } from 'react';

const MAX_AMOUNT = 1_000_000;
const MIN_AMOUNT = 50_000;
export default function LoanAmountSlider({
  onValueChange,
}: {
  onValueChange: (value: number[]) => void;
}) {
  const { principalAmount, setPrincipalAmount } =
    useLoanApplicationWorkflowStore();
  const [value, setValue] = useState([principalAmount || MIN_AMOUNT]);
  return (
    <div className="flex flex-col gap-2">
      <Slider
        defaultValue={[MIN_AMOUNT]}
        min={MIN_AMOUNT}
        max={MAX_AMOUNT}
        value={value}
        onValueChange={(value) => {
          setValue(value);
          onValueChange(value);
          setPrincipalAmount(value[0]);
        }}
        step={10000}
      />

      <div className="flex items-center w-full justify-between [&>p]:text-muted-foreground [&>p]:text-xs">
        <p>₦{MIN_AMOUNT.toLocaleString()}</p>
        <p>₦{MAX_AMOUNT.toLocaleString()}</p>
      </div>
    </div>
  );
}
