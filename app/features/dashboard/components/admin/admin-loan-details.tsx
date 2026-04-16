"use client";
import { ArrowLeft01Icon, ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { LoanAmountCard } from "./loan-amount-card";
import {
  LOANS_QUERY_KEY,
  useLoanApproval,
  useLoans,
} from "@/app/features/loans/hooks";
import { Loan } from "@/types";
import { LoanBreakdown } from "./loan-breakdown";
import { LoanApplicantCard } from "./loan-applicant-card";
import { DecisionCard } from "./decision-card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { ConfirmDialogContent } from "./confirm-dialog-content";
import { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const loan: Loan = {
  id: 101,
  loanNumber: "LN-2024-8842",
  loanType: "PERSONAL",
  principalAmount: 250000,
  interestRate: 4.5,
  termMonths: 360,
  monthlyPayment: 1266.71,
  outstandingBalance: 242500,
  status: "APPROVED",
  applicationDate: "2024-01-15T09:00:00Z",
  disbursementDate: "2024-02-01T14:30:00Z",
  maturityDate: "2054-02-01T00:00:00Z",
};
export function AdminLoanDetails({ id }: { id: string }) {
  const [confirmationModalType, setConfirmationModalType] = useState<
    "approve" | "reject" | null
  >(null);
  const [interestRate, setInterestRate] = useState(loan.interestRate);

  const mutation = useLoanApproval();
  const queryClient = new QueryClient();

  const handleDecision = (decision: "approve" | "reject") => {
    mutation.mutate(
      { loanId: Number(id), payload: { interestRate } },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: [LOANS_QUERY_KEY] });
          toast.success(
            `Loan ${data.loanNumber} ${decision === "approve" ? "approved" : "rejected"} successfully!`,
          );
        },
        onError: (error) => {
          toast.error(`Failed to ${decision} loan: ${error.message}`);
        },
      },
    );
  };
  return (
    <Dialog>
      <div className="flex flex-col gap-10 p-6">
        <Link
          className="text-muted-foreground flex items-center gap-2"
          href="/loans"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} />
          Back to applications
        </Link>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col gap-6">
            <LoanAmountCard loan={loan} />
            <LoanBreakdown loan={loan} />
          </div>
          <div className="flex w-full flex-col gap-6">
            <LoanApplicantCard
              applicant={{
                firstName: "Obinna",
                lastName: "Anosike",
                email: "smartlify09@gmail.com",
              }}
            />
            <DecisionCard
              approve={() => {
                setConfirmationModalType("approve");
              }}
              reject={() => {
                setConfirmationModalType("reject");
              }}
            />
          </div>
        </div>
      </div>
      <ConfirmDialogContent
        onClick={() => handleDecision(confirmationModalType!)}
        type={confirmationModalType}
        loan={loan}
        onInterestRateChange={(value) => {
          setInterestRate(value);
        }}
      />
    </Dialog>
  );
}
