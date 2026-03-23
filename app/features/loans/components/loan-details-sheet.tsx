'use client';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Loan, LoanStatus, LoanType } from '@/types';
import { formatCurrency } from '@/lib/utils';
import {
  calculateInterest,
  calculateTotalRepayableAmount,
  percentagePaid,
  totalPaid,
} from '@/lib/loan-utils';
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react';
import {
  User,
  House02Icon,
  Briefcase,
  Refresh,
  ArrowRight,
} from '@hugeicons/core-free-icons';
import { Card } from '@/components/ui/card';
import { format, addMonths } from 'date-fns';
import {
  LoanStatusAlert,
  LoanStatusAlertIcon,
  LoanStatusAlertLabel,
  LoanStatusAlertMessage,
  LOAN_STATUS_COLORS,
} from './loans-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto pb-4">
        {loan && (
          <>
            <LoanDetailsHeader
              loanType={loan.loanType}
              loanNumber={loan.loanNumber}
            />
            <div className="px-4 flex flex-col gap-4">
              <LoanDetailsAmountCard loan={loan} />
              {loan.status === 'ACTIVE' && (
                <LoanDetailsPaymentCard loan={loan} />
              )}
              {(loan.status === 'PENDING' ||
                loan.status === 'APPROVED' ||
                loan.status === 'REJECTED') && (
                <LoanStatusAlertSection status={loan.status} />
              )}
              <LoanDetailsSection loan={loan} />
            </div>

            <SheetFooter className="p-4 border-t">
              {loan.status === 'REJECTED' && (
                <Button asChild variant={'ghost'} className="w-full">
                  <HugeiconsIcon icon={Refresh} size={16} />
                  <Link href="/loans/apply">Apply again</Link>
                </Button>
              )}

              {loan.status === 'ACTIVE' && (
                <Button className="">
                  Make Payment <HugeiconsIcon icon={ArrowRight} size={16} />
                </Button>
              )}

              {(loan.status === 'APPROVED' || loan.status === 'PENDING') && (
                <Button disabled variant={'outline'}>
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
        <div className="rounded-md flex items-center justify-center ring ring-border bg-secondary size-8">
          <HugeiconsIcon icon={icon[loanType]} size={16} />
        </div>
        <div className="flex flex-col">
          <SheetTitle className="text-xs uppercase text-muted-foreground">
            {loanType} loan
          </SheetTitle>
          <p className="text-sm font-medium text-foreground">{loanNumber}</p>
        </div>
      </div>
    </SheetHeader>
  );
}

function LoanDetailsAmountCard({ loan }: { loan: Loan }) {
  return (
    <Card className="flex flex-col gap-3 px-4 py-4 bg-muted">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground uppercase">
          Principal amount
        </span>
        <span className="text-3xl tracking-tighter text-foreground">
          {formatCurrency(loan.principalAmount, 'NGN')}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
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
          value={formatCurrency(loan.monthlyPayment, 'NGN')}
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
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

function LoanDetailsPaymentCard({ loan }: { loan: Loan }) {
  const totalPayment = totalPaid(loan);
  const percentage = percentagePaid(loan);
  const totalRepayable =
    loan.principalAmount +
    (loan.principalAmount * loan.interestRate * loan.termMonths) / 100;
  const outstanding = loan.principalAmount - totalPayment;

  return (
    <div className="bg-primary/5 rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Balance paid down</span>
        <span className="text-sm font-medium text-foreground">
          {formatCurrency(totalPayment, 'NGN')}
        </span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full">
        <div
          className="rounded-full h-2 bg-primary transition-all"
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
        value={formatCurrency(paid, 'NGN')}
      />
      <LoanDetailsPaymentSummaryItem
        label="Outstanding"
        value={formatCurrency(outstanding, 'NGN')}
      />
      <LoanDetailsPaymentSummaryItem
        label="of"
        value={formatCurrency(totalRepayable, 'NGN')}
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
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-medium text-foreground">{value}</span>
    </div>
  );
}

function LoanDetailsSection({ loan }: { loan: Loan }) {
  const showLimitedDetails =
    loan.status === 'PENDING' ||
    loan.status === 'APPROVED' ||
    loan.status === 'REJECTED';

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
      <h3 className="text-sm font-medium text-foreground">Loan details</h3>
      <div className="flex flex-col divide-y divide-border">
        <LoanDetailItem
          label="Applied on"
          value={format(loan.applicationDate, 'PPP')}
        />
        {!showLimitedDetails && (
          <>
            <LoanDetailItem
              label="Disbursed date"
              value={format(loan.disbursementDate, 'PPP')}
            />
            <LoanDetailItem
              label="Maturity date"
              value={format(loan.maturityDate, 'PPP')}
            />
            <LoanDetailItem
              label="Total interest"
              value={formatCurrency(totalInterest, 'NGN')}
            />
            <LoanDetailItem
              label="Total repayable"
              value={formatCurrency(totalRepayable, 'NGN')}
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
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-medium text-foreground">{value}</span>
    </div>
  );
}

function LoanStatusAlertSection({ status }: { status: LoanStatus }) {
  const alertConfig: Record<
    LoanStatus,
    { label: string; message: string } | null
  > = {
    PENDING: {
      label: 'Under review',
      message:
        "Your application is being reviewed. You'll be notified by email once a decision has been made.",
    },
    APPROVED: {
      label: 'Awaiting disbursement',
      message:
        'Your loan has been approved. Our team will disburse the funds and the status will update to Active once done.',
    },
    REJECTED: {
      label: 'Application not approved',
      message:
        'This application was declined. You are welcome to submit a new application at any time.',
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
