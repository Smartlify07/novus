import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useStepper } from "./stepper";
import { useLoanApplicationWorkflowStore } from "@/store/loan-application-workflow-store";
import LiveEstimateCard from "./live-estimate-card";

const repaymentPeriods = [
  { months: 6, years: "6mo" },
  { months: 12, years: "1yr" },
  { months: 24, years: "2yrs" },
  { months: 36, years: "3yrs" },
  { months: 48, years: "4yrs" },
  { months: 60, years: "5yrs" },
];

export default function RepaymentPeriodStep() {
  const { setTermMonths, termMonths, principalAmount } =
    useLoanApplicationWorkflowStore();
  const [selectedMonths, setSelectedMonths] = useState<number | null>(
    termMonths || 12,
  );
  const [customMonths, setCustomMonths] = useState<string>("");
  const stepper = useStepper();

  const handleSelect = (months: number) => {
    setSelectedMonths(months);
    setCustomMonths("");
    setTermMonths(months);
  };

  const handleCustomChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    setCustomMonths(numericValue);
    if (numericValue) {
      const months = parseInt(numericValue, 10);
      if (months >= 0 && months <= 360) {
        setSelectedMonths(months);
        setTermMonths(months);
      }
    } else {
      setSelectedMonths(null);
      setTermMonths(0);
    }
  };

  return (
    <Card className="flex max-w-xl flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <CardTitle className="text-xl tracking-tighter lg:text-2xl">
          Choose your repayment period
        </CardTitle>
        <CardDescription className="tracking-tight">
          Select how long you need to repay your loan
        </CardDescription>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {repaymentPeriods.map((period) => (
          <button
            key={period.months}
            type="button"
            onClick={() => handleSelect(period.months)}
            className={`flex flex-col items-center justify-center rounded-lg border p-4 transition-colors ${
              selectedMonths === period.months
                ? "border-primary bg-primary/5"
                : "border-input hover:bg-muted"
            }`}
          >
            <span className="text-2xl font-medium tracking-tight">
              {period.months}
            </span>
            <span className="text-muted-foreground text-xs">
              {period.years}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            type="text"
            inputMode="numeric"
            placeholder="Enter custom months"
            value={customMonths}
            onChange={(e) => handleCustomChange(e.target.value)}
            className="w-full placeholder:text-sm"
          />
        </div>
        <span className="text-muted-foreground shrink-0 text-sm">
          (0-360) months
        </span>
      </div>

      <LiveEstimateCard
        title={`Updated estimate for ${selectedMonths} months`}
        principalAmount={principalAmount ?? 0}
        months={selectedMonths ?? 12}
      />

      <CardFooter className="bg-card flex items-center justify-between rounded-none px-0">
        <p className="text-muted-foreground text-sm">
          Step <span className="text-foreground">3</span> of 5
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            onClick={() => {
              stepper.onChange({ id: 2, value: "amount" });
            }}
          >
            Back
          </Button>
          <Button
            variant={"default"}
            disabled={!selectedMonths}
            onClick={() => {
              stepper.onChange({ id: 4, value: "purpose" });
              setTermMonths(termMonths);
            }}
          >
            Continue
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
