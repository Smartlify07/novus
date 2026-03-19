import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLoanApplicationWorkflowStore } from '@/store/loan-application-workflow-store';
import { Briefcase, House02Icon, User02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react';
import { useStepper } from './stepper';
import { LoanType } from '@/types';

const loans: {
  id: number;
  type: 'PERSONAL' | 'BUSINESS' | 'MORTGAGE';
  label: string;
  description: string;
  icon: IconSvgElement;
}[] = [
  {
    id: 1,
    type: 'PERSONAL',
    label: 'Personal',
    description: 'For everyday needs and expenses',
    icon: User02Icon,
  },

  {
    id: 2,
    type: 'BUSINESS',
    label: 'Business',
    description: 'Grow your business or venture',
    icon: Briefcase,
  },

  {
    id: 3,
    type: 'MORTGAGE',
    label: 'Mortgage',
    description: 'Home purchase or refinance',
    icon: House02Icon,
  },
];

export default function LoanTypeStep() {
  const { loanType, setLoanType } = useLoanApplicationWorkflowStore();
  const { onChange } = useStepper();
<<<<<<< HEAD
=======
  console.log(loanType);
>>>>>>> e227e3c4c3809eae3dfb4a085e757138e252860e
  return (
    <Card className="p-6 max-w-xl flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <CardTitle className="text-2xl tracking-tighter">
          What type of loan do you need?
        </CardTitle>
        <CardDescription className="tracking-tight">
          Select the loan category that best matches your goal
        </CardDescription>
      </div>
      <LoanTypeChoiceCard
        onSelect={(value) => {
          setLoanType(value as LoanType);
        }}
<<<<<<< HEAD
        value={loanType}
=======
>>>>>>> e227e3c4c3809eae3dfb4a085e757138e252860e
      />

      <CardFooter className="bg-card rounded-none px-0  flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Step <span className="text-foreground">1</span> of 5
        </p>

        <Button
          variant={'default'}
          onClick={() => {
<<<<<<< HEAD
            onChange({ id: 2, value: 'amount' });
=======
            onChange('amount');
>>>>>>> e227e3c4c3809eae3dfb4a085e757138e252860e
          }}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}

export function LoanTypeChoiceCard({
  onSelect,
<<<<<<< HEAD
  value,
}: {
  onSelect: (value: string) => void;
  value: string | null;
}) {
  return (
    <RadioGroup
      value={value}
=======
}: {
  onSelect: (value: string) => void;
}) {
  return (
    <RadioGroup
>>>>>>> e227e3c4c3809eae3dfb4a085e757138e252860e
      onValueChange={(value) => onSelect(value)}
      className=" grid grid-cols-2 gap-4"
    >
      {loans.map((loan) => (
        <FieldLabel key={loan.id} htmlFor={loan.type}>
          <Field orientation="horizontal" className="items-start">
            <div className="flex flex-col gap-4 items-start">
              <div className="rounded-md size-12 flex items-center justify-center bg-primary/5">
                <HugeiconsIcon icon={loan.icon} size={24} />
              </div>
              <FieldContent>
                <FieldTitle className="text-lg tracking-tight">
                  {loan.label}
                </FieldTitle>
                <FieldDescription className="tracking-tight">
                  {loan.description}
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem
                className="hidden sr-only"
                value={loan.type}
                id={loan.type}
              />
            </div>
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
}
