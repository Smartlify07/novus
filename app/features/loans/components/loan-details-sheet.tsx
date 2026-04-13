"use client";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loan, LoanStatus, LoanType } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  calculateInterest,
  calculateTotalRepayableAmount,
  percentagePaid,
} from "@/lib/loan-utils";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import {
  User,
  House02Icon,
  Briefcase,
  Refresh,
  ArrowRight02Icon,
  Checkmark,
} from "@hugeicons/core-free-icons";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import {
  LoanStatusAlert,
  LoanStatusAlertLabel,
  LoanStatusAlertMessage,
  LOAN_STATUS_COLORS,
} from "./loans-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoanRepayment } from "@/app/features/loans/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoanRepayments, useLoans } from "../hooks";

interface LoanDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loan: Loan | null;
}

export default function LoanDetailsSheet({
  open,
  onOpenChange,
  loan,
}: LoanDetailsSheetProps) {
  const { data: loansData } = useLoans();
  const resolvedLoan = loan
    ? loansData?.loans?.find((currentLoan) => currentLoan.id === loan.id) ||
      loan
    : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto pb-4">
        {resolvedLoan && (
          <>
            <LoanDetailsHeader
              loanType={resolvedLoan.loanType}
              loanNumber={resolvedLoan.loanNumber}
            />
            <div className="flex flex-col gap-4 px-4">
              <LoanDetailsAmountCard loan={resolvedLoan} />
              {resolvedLoan.status === "ACTIVE" && (
                <LoanDetailsPaymentCard loan={resolvedLoan} />
              )}
              {(resolvedLoan.status === "PENDING" ||
                resolvedLoan.status === "APPROVED" ||
                resolvedLoan.status === "REJECTED") && (
                <LoanStatusAlertSection status={resolvedLoan.status} />
              )}
              <LoanDetailsSection loan={resolvedLoan} />
              {resolvedLoan.status === "ACTIVE" && (
                <LoanRepaymentsList loanId={resolvedLoan.id} />
              )}
            </div>

            <SheetFooter className="border-t p-4">
              {resolvedLoan.status === "REJECTED" && (
                <Button asChild variant={"ghost"} className="w-full">
                  <HugeiconsIcon icon={Refresh} size={16} />
                  <Link href="/loans/apply">Apply again</Link>
                </Button>
              )}

              {resolvedLoan.status === "ACTIVE" && (
                <Button asChild className="w-full">
                  <Link href={`/loans/${resolvedLoan.id}/repay`}>
                    Make Payment{" "}
                    <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
                  </Link>
                </Button>
              )}

              {(resolvedLoan.status === "APPROVED" ||
                resolvedLoan.status === "PENDING") && (
                <Button disabled variant={"outline"}>
                  Awaiting Update
                </Button>
              )}
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function LoanDetailsHeader({
  loanType,
  loanNumber,
}: {
  loanType: LoanType;
  loanNumber: string;
}) {
  const icon: Record<LoanType, IconSvgElement> = {
    MORTGAGE: House02Icon,
    PERSONAL: User,
    BUSINESS: Briefcase,
  };

  return (
    <SheetHeader className="flex-row items-start justify-between">
      <div className="flex items-center gap-2">
        <div className="ring-border bg-secondary flex size-8 items-center justify-center rounded-md ring">
          <HugeiconsIcon icon={icon[loanType]} size={16} />
        </div>
        <div className="flex flex-col">
          <SheetTitle className="text-muted-foreground text-xs uppercase">
            {loanType} loan
          </SheetTitle>
          <p className="text-foreground text-xs font-medium">{loanNumber}</p>
        </div>
      </div>
    </SheetHeader>
  );
}

function LoanDetailsAmountCard({ loan }: { loan: Loan }) {
  return (
    <Card className="bg-primary/5 flex flex-col gap-3 px-4 py-4">
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-xs uppercase">
          Principal amount
        </span>
        <span className="text-foreground text-3xl tracking-tighter">
          {formatCurrency(loan.principalAmount, "NGN")}
        </span>
      </div>
      <div className="border-border grid grid-cols-3 gap-2 border-t pt-2">
        <LoanDetailsAmountCardItem
          label="Rate"
          value={`${loan.interestRate}%`}
        />
        <LoanDetailsAmountCardItem
          label="Term"
          value={`${loan.termMonths} months`}
        />
        <LoanDetailsAmountCardItem
          label="Monthly"
          value={formatCurrency(loan.monthlyPayment, "NGN")}
        />
      </div>
    </Card>
  );
}

function LoanDetailsAmountCardItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="text-foreground text-sm font-medium">{value}</span>
    </div>
  );
}

function LoanDetailsPaymentCard({ loan }: { loan: Loan }) {
  const outstanding = loan.outstandingBalance;
  const percentage = percentagePaid(loan);
  const { data } = useLoanRepayments(loan.id);
  const totalPayment = data?.totalRepaid ?? 0;
  const totalRepayable = totalPayment + outstanding;
  return (
    <div className="bg-primary/5 flex flex-col gap-3 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs">Balance paid down</span>
        <span className="text-foreground text-sm font-medium">
          {formatCurrency(totalPayment, "NGN")}
        </span>
      </div>
      <div className="bg-muted h-2 w-full rounded-full">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <LoanDetailsPaymentSummary
        paid={totalPayment}
        outstanding={outstanding}
        totalRepayable={totalRepayable}
      />
    </div>
  );
}

function LoanDetailsPaymentSummary({
  paid,
  outstanding,
  totalRepayable,
}: {
  paid: number;
  outstanding: number;
  totalRepayable: number;
}) {
  return (
    <div className="grid grid-cols-3 gap-2 pt-2">
      <LoanDetailsPaymentSummaryItem
        label="Paid"
        value={formatCurrency(paid, "NGN")}
      />
      <LoanDetailsPaymentSummaryItem
        label="Outstanding"
        value={formatCurrency(outstanding, "NGN")}
      />
      <LoanDetailsPaymentSummaryItem
        label="of"
        value={formatCurrency(totalRepayable, "NGN")}
      />
    </div>
  );
}

function LoanDetailsPaymentSummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="text-foreground text-xs font-medium">{value}</span>
    </div>
  );
}

function LoanDetailsSection({ loan }: { loan: Loan }) {
  const showLimitedDetails =
    loan.status === "PENDING" ||
    loan.status === "APPROVED" ||
    loan.status === "REJECTED";

  const totalRepayable = calculateTotalRepayableAmount(
    loan.principalAmount,
    loan.interestRate,
    loan.termMonths,
  );
  const totalInterest = calculateInterest(
    loan.principalAmount,
    loan.interestRate,
    loan.termMonths,
  );

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-sm font-medium">Loan details</h3>
      <div className="divide-border flex flex-col divide-y">
        <LoanDetailItem
          label="Applied on"
          value={format(loan.applicationDate, "PPP")}
        />
        {!showLimitedDetails && (
          <>
            <LoanDetailItem
              label="Disbursed date"
              value={format(loan.disbursementDate, "PPP")}
            />
            <LoanDetailItem
              label="Maturity date"
              value={format(loan.maturityDate, "PPP")}
            />
            <LoanDetailItem
              label="Total interest"
              value={formatCurrency(totalInterest, "NGN")}
            />
            <LoanDetailItem
              label="Total repayable"
              value={formatCurrency(totalRepayable, "NGN")}
            />
          </>
        )}
      </div>
    </div>
  );
}

function LoanDetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="text-foreground text-xs font-medium">{value}</span>
    </div>
  );
}

function LoanStatusAlertSection({ status }: { status: LoanStatus }) {
  const alertConfig: Record<
    LoanStatus,
    { label: string; message: string } | null
  > = {
    PENDING: {
      label: "Under review",
      message:
        "Your application is being reviewed. You'll be notified by email once a decision has been made.",
    },
    APPROVED: {
      label: "Awaiting disbursement",
      message:
        "Your loan has been approved. Our team will disburse the funds and the status will update to Active once done.",
    },
    REJECTED: {
      label: "Application not approved",
      message:
        "This application was declined. You are welcome to submit a new application at any time.",
    },
    ACTIVE: null,
    CLOSED: null,
  };

  const config = alertConfig[status];
  const colors = LOAN_STATUS_COLORS[status];

  if (!config) return null;

  return (
    <LoanStatusAlert
      className="flex flex-row items-center gap-2"
      style={{
        background: colors.bg,
        color: colors.color,
        border: `1px solid ${colors.border}`,
      }}
    >
      <div className="flex flex-col">
        <LoanStatusAlertLabel className="text-sm">
          {config.label}
        </LoanStatusAlertLabel>
        <LoanStatusAlertMessage>{config.message}</LoanStatusAlertMessage>
      </div>
    </LoanStatusAlert>
  );
}

function LoanRepaymentItemSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-4 w-20" />
    </div>
  );
}

function LoanRepaymentsList({ loanId }: { loanId: number }) {
  const { data, isLoading } = useLoanRepayments(loanId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <h3 className="text-foreground text-xs font-medium">Repayments</h3>
        <div className="flex flex-col gap-2">
          <LoanRepaymentItemSkeleton />
          <LoanRepaymentItemSkeleton />
        </div>
      </div>
    );
  }

  if (!data?.repayments?.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-sm font-medium">Repayments</h3>
      <div className="flex flex-col gap-2">
        {data.repayments.map((repayment: LoanRepayment) => (
          <Card
            key={repayment.id}
            className="bg-muted/50 no-scrollbar flex flex-row items-center justify-between overflow-auto border px-4 py-4 ring-0"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-8 items-center justify-center rounded-full bg-green-100">
                <HugeiconsIcon
                  icon={Checkmark}
                  size={24}
                  className="text-green-600"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <h1 className="text-foreground text-sm">
                  {format(new Date(repayment.paymentDate), "PPP")}
                </h1>
                <p className="text-muted-foreground text-xs">
                  {repayment.paymentRef}
                </p>
              </div>
            </div>
            <p className="text-foreground text-sm font-medium">
              {formatCurrency(repayment.amount, "NGN")}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
