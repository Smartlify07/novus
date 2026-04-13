import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLoanApplicationWorkflowStore } from "@/store/loan-application-workflow-store";
import { Briefcase, House02Icon, User02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { useStepper } from "./stepper";
import { LoanType } from "@/types";

const loans: {
  id: number;
  type: "PERSONAL" | "BUSINESS" | "MORTGAGE";
  label: string;
  description: string;
  icon: IconSvgElement;
}[] = [
  {
    id: 1,
    type: "PERSONAL",
    label: "Personal",
    description: "For everyday needs and expenses",
    icon: User02Icon,
  },

  {
    id: 2,
    type: "BUSINESS",
    label: "Business",
    description: "Grow your business or venture",
    icon: Briefcase,
  },

  {
    id: 3,
    type: "MORTGAGE",
    label: "Mortgage",
    description: "Home purchase or refinance",
    icon: House02Icon,
  },
];

export default function LoanTypeStep() {
  const { loanType, setLoanType } = useLoanApplicationWorkflowStore();
  const { onChange } = useStepper();
  return (
    <Card className="flex max-w-xl flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <CardTitle className="text-xl tracking-tighter lg:text-2xl">
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
        value={loanType}
      />

      <CardFooter className="bg-card flex items-center justify-between rounded-none px-0">
        <p className="text-muted-foreground text-sm">
          Step <span className="text-foreground">1</span> of 5
        </p>

        <Button
          variant={"default"}
          onClick={() => {
            onChange({ id: 2, value: "amount" });
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
  value,
}: {
  onSelect: (value: string) => void;
  value: string | null;
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(value) => onSelect(value)}
      className="grid gap-4 lg:grid-cols-2"
    >
      {loans.map((loan) => (
        <FieldLabel key={loan.id} htmlFor={loan.type}>
          <Field orientation="horizontal" className="items-start">
            <div className="flex flex-col items-start gap-4">
              <div className="bg-primary/5 flex size-12 items-center justify-center rounded-md">
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
                className="sr-only hidden"
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
