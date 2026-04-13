"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import { Clock04Icon } from "@hugeicons/core-free-icons";
import { useLoanApplicationWorkflowStore } from "@/store/loan-application-workflow-store";
import { calculateMonthlyPayment } from "@/lib/loan-utils";
import { formatCurrency } from "@/lib/utils";

export default function ApplicationSuccess() {
  const store = useLoanApplicationWorkflowStore();
  const loanType = store.loanType;
  const principalAmount = store.principalAmount ?? 0;
  const termMonths = store.termMonths ?? 12;

  const interestRate = 3.4;
  const monthlyPayment = calculateMonthlyPayment(
    principalAmount,
    interestRate,
    termMonths,
  );

  const formatLoanType = (type: string | null) => {
    if (!type) return "";
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  const loanRef = `LND-${Date.now().toString().slice(-8)}`;

  return (
    <div className="flex flex-col items-center px-6 py-10">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="bg-primary/5 flex size-14 items-center justify-center rounded-full lg:size-20">
            <HugeiconsIcon
              icon={Clock04Icon}
              size={36}
              className="text-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-normal tracking-tight lg:text-4xl">
              Application Submitted
            </h1>
            <p className="text-muted-foreground text-sm">
              We've received your application and it's now under review. You'll
              be notified within{" "}
              <span className="text-foreground font-medium">
                1–3 business days
              </span>{" "}
              once a decision has been made.
            </p>
          </div>
        </div>

        <Card className="flex w-full flex-col gap-4 p-4">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="gap-2">
              <HugeiconsIcon icon={Clock04Icon} size={14} />
              In review
            </Badge>
            <p className="text-muted-foreground text-xs">Ref: {loanRef}</p>
          </div>

          <Separator className="data-[orientation=horizontal]:h-[0.5px]" />

          <div className="flex flex-col">
            <div className="flex items-center justify-between py-2">
              <p className="text-muted-foreground text-sm">Loan type</p>
              <p className="text-foreground text-sm font-medium">
                {formatLoanType(loanType)} Loan
              </p>
            </div>
            <Separator className="data-[orientation=horizontal]:h-[0.5px]" />

            <div className="flex items-center justify-between py-2">
              <p className="text-muted-foreground text-sm">Amount requested</p>
              <p className="text-foreground text-sm font-medium">
                {formatCurrency(principalAmount, "NGN")}
              </p>
            </div>
            <Separator className="data-[orientation=horizontal]:h-[0.5px]" />

            <div className="flex items-center justify-between py-2">
              <p className="text-muted-foreground text-sm">Repayment term</p>
              <p className="text-foreground text-sm font-medium">
                {termMonths} months
              </p>
            </div>
            <Separator className="data-[orientation=horizontal]:h-[0.5px]" />

            <div className="flex items-center justify-between py-2">
              <p className="text-muted-foreground text-sm">
                Est. monthly payment
              </p>
              <div className="flex items-center gap-1">
                <p className="text-foreground text-sm font-medium">
                  {formatCurrency(monthlyPayment, "NGN")}
                </p>
                <p className="text-muted-foreground text-xs">if approved</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="bg-primary/5 w-full rounded-lg p-4">
          <p className="text-muted-foreground text-center text-xs">
            We may contact you for additional documents during the review
            process. Check your email and notifications for updates.
          </p>
        </div>

        <div className="flex w-full items-center gap-3">
          <Button
            onClick={() => {
              store.resetStep();
            }}
            variant="outline"
            className="flex-1"
            asChild
          >
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button
            onClick={() => {
              store.resetStep();
            }}
            variant="default"
            className="flex-1"
            asChild
          >
            <Link href="/loans">View Loan Applications</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
