"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStepper } from "./stepper";
import { useLoanApplicationWorkflowStore } from "@/store/loan-application-workflow-store";
import {
  calculateInterest,
  calculateMonthlyPayment,
  calculateTotalRepayableAmount,
} from "@/lib/loan-utils";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useSubmitLoanApplication } from "../hooks";
import { LoanApplicationPayload } from "../types";
import { useCurrentAccount } from "@/app/features/accounts/hooks";
import { useQueryClient } from "@tanstack/react-query";

type ReviewStepProps = {
  onSubmitSuccess?: () => void;
};

export default function ReviewStep({ onSubmitSuccess }: ReviewStepProps) {
  const queryClient = useQueryClient();
  const { mutate: submitApplication, isPending } = useSubmitLoanApplication({
    onSuccess: () => {
      onSubmitSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["loans"] });
    },
  });
  const stepper = useStepper();
  const store = useLoanApplicationWorkflowStore();
  const { data: account } = useCurrentAccount();
  const loanType = store.loanType;
  const purpose = store.purpose ?? "";
  const principalAmount = store.principalAmount ?? 0;
  const termMonths = store.termMonths ?? 12;
  const setIsSubmitted = store.setIsSubmitted;

  const interestRate = 3.4;
  const monthlyPayment = calculateMonthlyPayment(
    principalAmount,
    interestRate,
    termMonths,
  );
  const totalInterest = calculateInterest(
    principalAmount,
    interestRate,
    termMonths,
  );
  const totalRepayable = calculateTotalRepayableAmount(
    principalAmount,
    interestRate,
    termMonths,
  );

  const handleSubmit = () => {
    const payload: LoanApplicationPayload = {
      accountId: account?.id!,
      loanType: store.loanType!,
      principalAmount: store.principalAmount ?? 0,
      termMonths: store.termMonths ?? 12,
      purpose: store.purpose ?? "",
    };

    submitApplication(payload, {
      onError: (error) => {
        toast.error(error.message || "Failed to submit application");
      },
    });
  };

  const formatLoanType = (type: string | null) => {
    if (!type) return "";
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  return (
    <Card className="flex max-w-xl flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <CardTitle className="text-xl tracking-tighter lg:text-2xl">
          Review your application
        </CardTitle>
        <CardDescription className="tracking-tight">
          Confirm all details before submitting
        </CardDescription>
      </div>

      <Card className="">
        <CardContent className="flex flex-col gap-2">
          <CardDescription className="text-xs tracking-tight uppercase">
            {formatLoanType(loanType)} Loan
          </CardDescription>
          <CardTitle className="text-3xl tracking-tighter lg:text-5xl">
            {formatCurrency(principalAmount, "NGN")}
          </CardTitle>
        </CardContent>

        <CardFooter className="grid gap-2 rounded-none bg-transparent lg:grid-cols-3 lg:gap-4">
          <Block label="Term" value={`${termMonths} months`} />
          <Block
            label="Monthly"
            value={formatCurrency(monthlyPayment, "NGN")}
          />
          <Block label="Rate" value={`${interestRate}%`} />
        </CardFooter>
      </Card>

      <Card className="">
        <CardContent className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <Block
            label="Principal"
            value={formatCurrency(principalAmount, "NGN")}
          />
          <Block
            label="Total Interest"
            value={formatCurrency(totalInterest, "NGN")}
          />
          <Block
            label="Total Repayable"
            value={formatCurrency(totalRepayable, "NGN")}
          />
        </CardContent>
      </Card>

      <Card className="bg-muted/50 flex flex-col ring-0">
        <CardHeader>
          <CardTitle className="text-muted-foreground text-xs uppercase">
            Purpose
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground text-sm font-medium">{purpose}</p>
        </CardContent>
      </Card>

      <Card className="bg-muted/50 p-4 ring-0">
        <p className="text-muted-foreground text-xs">
          Rates shown are indicative and based on a 3.4% monthly interest rate.
          Your final offer may vary based on credit assessment. Lendly does not
          guarantee approval. All figures are pre-disbursement estimates.
        </p>
      </Card>

      <CardFooter className="bg-card flex items-center justify-between rounded-none px-0">
        <p className="text-muted-foreground text-sm">
          Step <span className="text-foreground">5</span> of 5
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            onClick={() => {
              stepper.onChange({ id: 4, value: "purpose" });
            }}
          >
            Back
          </Button>
          <Button
            variant={"default"}
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending && <Spinner className="" />}
            Submit Application
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function Block({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1 lg:flex-col lg:items-start">
      <p className="text-muted-foreground text-sm lg:text-xs">
        {label} <span className="lg:hidden">:</span>
      </p>
      <h3 className="text-base tracking-tighter lg:text-lg">{value} </h3>
    </div>
  );
}
