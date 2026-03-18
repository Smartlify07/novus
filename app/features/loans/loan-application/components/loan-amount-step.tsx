import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import LoanAmountSlider from './loan-amount-slider';
import LoanAmountDisplay from './loan-amount-display';
import { useState } from 'react';
import LiveEstimateCard from './live-estimate-card';

export default function LoanAmountStep() {
  const [value, setValue] = useState([50000]);
  console.log(value);
  return (
    <Card className="p-6 max-w-xl flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <CardTitle className="text-2xl tracking-tighter">
          How much do you need?{' '}
        </CardTitle>
        <CardDescription className="tracking-tight">
          Drag the slider or type an amount between ₦50,000 and ₦10,000,000.
        </CardDescription>
      </div>

      <LoanAmountDisplay principalAmount={value[0]} />
      <LoanAmountSlider onValueChange={(value) => setValue(value)} />
      <LiveEstimateCard principalAmount={value[0]} />

      <CardFooter className="bg-card rounded-none px-0  flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Step <span className="text-foreground">2</span> of 5
        </p>

        <Button variant={'default'} onClick={() => {}}>
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
