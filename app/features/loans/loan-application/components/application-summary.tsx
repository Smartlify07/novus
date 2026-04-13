"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLoanApplicationWorkflowStore } from "@/store/loan-application-workflow-store";
import {
  calculateInterest,
  calculateMonthlyPayment,
  calculateTotalRepayableAmount,
} from "@/lib/loan-utils";
import { formatCurrency } from "@/lib/utils";

export default function ApplicationSummary() {
  const store = useLoanApplicationWorkflowStore();
  const loanType = store.loanType;
  const principalAmount = store.principalAmount ?? 0;
  const termMonths = store.termMonths ?? 12;
  const purpose = store.purpose ?? "";

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

  const formatLoanType = (type: string | null) => {
    if (!type) return "";
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  const overviewItems = [
    { label: "Loan type", value: formatLoanType(loanType) },
    { label: "Total interest", value: formatCurrency(totalInterest, "NGN") },
    { label: "Total repayable", value: formatCurrency(totalRepayable, "NGN") },
    { label: "Term", value: `${termMonths} months` },
    { label: "Rate", value: `${interestRate}%/month` },
  ];

  return (
    <Card className="flex flex-col gap-6 p-6">
      <CardTitle className="text-muted-foreground text-sm uppercase">
        Application summary
      </CardTitle>

      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-xs">Principal amount</p>
        <CardTitle className="text-3xl tracking-tighter">
          {formatCurrency(principalAmount, "NGN")}
        </CardTitle>
        <Separator />
      </div>

      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="text-muted-foreground text-xs uppercase">
            Est. monthly payment
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <CardTitle className="text-xl tracking-tighter">
            {formatCurrency(monthlyPayment, "NGN")}
          </CardTitle>
          <CardDescription className="text-muted-foreground text-xs">
            for {termMonths} months at {interestRate}%/mo.
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="">
        <CardContent>
          {overviewItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between border-b py-2 last:border-b-0"
            >
              <p className="text-muted-foreground text-sm">{item.label}</p>
              <p className="text-foreground text-sm font-medium">
                {item.value}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </Card>
  );
}
