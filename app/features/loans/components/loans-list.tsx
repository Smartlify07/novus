import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { format } from "date-fns";
import { Tabs } from "./your-loans-section";
import { percentagePaid, totalPaid } from "@/lib/loan-utils";
import { useLoans } from "../hooks";
import { Loan, LoanStatus, LoanType } from "@/types";
import {
  Briefcase,
  Document,
  House02Icon,
  InformationCircleIcon,
  MoneyBag02Icon,
  User,
} from "@hugeicons/core-free-icons";
import { convertToCapitalized } from "../repayment/utils";

export const LOAN_STATUS_COLORS: Record<
  LoanStatus,
  {
    bg: string;
    color: string;
    border: string;
  }
> = {
  ACTIVE: {
    bg: "#EDF5EE",
    color: "#3D6644",
    border: "#D5E7D8",
  },
  APPROVED: {
    bg: "#E8F3F8",
    color: "#2D6E8A",
    border: "#B5D4E8",
  },
  PENDING: {
    bg: "#FEF5E7",
    color: "#8A6200",
    border: "#F5DCB0",
  },
  CLOSED: {
    bg: "#F8F5F0",
    color: "#6B7B72",
    border: "rgba(28,37,35,0.1)",
  },
  REJECTED: {
    bg: "#FCEBEB",
    color: "#8B2020",
    border: "#F5C4C4",
  },
};

const LOAN_STATUS_BADGE: Record<
  LoanStatus,
  {
    bg: string;
    color: string;
    border: string;
    label: string;
    alertLabel?: string;
    dot: boolean;
  }
> = {
  ACTIVE: {
    bg: "#EDF5EE",
    color: "#3D6644",
    border: "#D5E7D8",
    label: "Active",
    dot: true,
  },
  APPROVED: {
    bg: "#E8F3F8",
    color: "#2D6E8A",
    border: "#B5D4E8",
    label: "Approved",
    alertLabel:
      "Your loan is approved. Funds will be disbursed by our team shortly.",
    dot: true,
  },
  PENDING: {
    bg: "#FEF5E7",
    color: "#8A6200",
    border: "#F5DCB0",
    label: "Pending review",
    dot: true,
    alertLabel:
      "Application under review. You'll be notified once a decision is made.",
  },
  CLOSED: {
    bg: "#F8F5F0",
    color: "#6B7B72",
    border: "rgba(28,37,35,0.1)",
    label: "Closed",
    dot: false,
  },
  REJECTED: {
    bg: "#FCEBEB",
    color: "#8B2020",
    border: "#F5C4C4",
    label: "Rejected",
    alertLabel: "This application was not approved. You may apply again.",
    dot: true,
  },
};

export default function LoansList({
  currentTab,
  onLoanClick,
}: {
  currentTab: Tabs;
  onLoanClick?: (loan: Loan) => void;
}) {
  const { data } = useLoans();

  const today = new Date();
  const filteredLoans = data?.loans?.filter((loan) => {
    if (currentTab === "ALL") {
      return true;
    } else {
      return loan.status === currentTab.toUpperCase();
    }
  });

  if (!filteredLoans?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <HugeiconsIcon
          icon={Document}
          size={48}
          className="text-primary mb-4"
        />
        <h3 className="text-foreground mb-1 text-lg font-medium">
          No loans found
        </h3>
        <p className="text-muted-foreground text-sm">
          {currentTab === "ALL"
            ? "You don't have any loans yet."
            : `You don't have any ${currentTab.toLowerCase()} loans.`}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {filteredLoans.map((loan) => (
        <LoanListItem
          today={today}
          key={loan.id}
          onClick={() => {
            onLoanClick?.(loan);
          }}
          {...loan}
        />
      ))}
    </div>
  );
}

export function LoanListItem({
  today,
  onClick,
  ...props
}: {
  today: Date;
  onClick?: () => void;
} & Loan) {
  const totalPayment = totalPaid(props);
  const percentage = percentagePaid(props);
  const outstanding = props.principalAmount - totalPayment;
  return (
    <Card className="cursor-pointer" onClick={onClick}>
      <LoanListItemHeader {...props} />
      <CardContent className="flex flex-col gap-4 py-0">
        <div className="flex flex-col gap-1">
          <LoanItemAmount amount={props.principalAmount} />
          <LoanListItemNumber number={props.loanNumber} />
        </div>

        {props.status === "ACTIVE" && (
          <LoanListItemProgress
            totalPayment={totalPayment}
            principalAmount={props.principalAmount}
            percentage={percentage}
          />
        )}
        {props.status !== "ACTIVE" && props.status !== "CLOSED" && (
          <LoanStatusAlertWithStatus status={props.status} />
        )}
      </CardContent>
      <CardFooter className="bg-card mx-4 grid grid-cols-3 items-start px-0">
        {props.status === "ACTIVE" && (
          <>
            <LoanItemFooterItem
              label="Monthly"
              value={formatCurrency(props.monthlyPayment, "NGN")}
              status={props.status}
              className="pl-0"
            />
            <LoanItemFooterItem
              label="Outstanding"
              value={formatCurrency(outstanding, "NGN")}
              status={props.status}
              valueClassName="text-amber-600"
            />

            <LoanItemFooterItem
              label="Matures"
              value={format(props.maturityDate, "PPP")}
              status={props.status}
              className="border-r-0"
            />
          </>
        )}
        {props.status !== "ACTIVE" && (
          <LoanItemFooterItem
            label="Amount"
            value={formatCurrency(props.principalAmount, "NGN")}
            status={props.status}
            className="pl-0"
          />
        )}

        {(props.status === "PENDING" || props.status === "APPROVED") && (
          <>
            <LoanItemFooterItem
              label="Term"
              value={`${props.termMonths} months`}
              status={props.status}
            />
            <LoanItemFooterItem
              label="Applied"
              value={format(props.applicationDate, "PPP")}
              status={props.status}
              className="border-r-0"
            />
          </>
        )}

        {props.status === "REJECTED" && (
          <>
            <LoanItemFooterItem
              label="Applied"
              value={format(props.applicationDate, "PPP")}
              status={props.status}
            />
          </>
        )}

        {props.status === "CLOSED" && (
          <>
            <LoanItemFooterItem
              label="Settled"
              value={formatCurrency(totalPayment, "NGN")}
              status={props.status}
              className="text-chart-4"
            />

            <LoanItemFooterItem
              label="Matured"
              value={format(props.maturityDate, "PPP")}
              status={props.status}
              className="text-chart-4 border-r-0"
            />
          </>
        )}
      </CardFooter>
    </Card>
  );
}

function LoanTypeSection({ loanType }: { loanType: LoanType }) {
  const icon: Record<LoanType, IconSvgElement> = {
    MORTGAGE: House02Icon,
    PERSONAL: User,
    BUSINESS: Briefcase,
  };
  return (
    <div className="flex items-center gap-2">
      <div className="ring-border bg-secondary flex size-8 items-center justify-center rounded-md ring">
        <HugeiconsIcon icon={icon[loanType]} size={16} />
      </div>
      <h1 className="text-muted-foreground text-sm capitalize">
        {convertToCapitalized(loanType)} loan
      </h1>
    </div>
  );
}

function LoanItemFooterItem({
  label,
  value,
  status,
  className,
  valueClassName,
  labelClassName,
}: {
  label: string;
  value: string;
  status: LoanStatus;
  labelClassName?: string;
  valueClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1 border-r pl-4", className)}>
      <h3
        className={cn(
          "text-muted-foreground text-xs capitalize",
          labelClassName,
        )}
      >
        {label}
      </h3>
      <p
        className={cn("text-sm tracking-tighter lg:text-base", valueClassName)}
      >
        {value}
      </p>
    </div>
  );
}

function LoanItemAmount({ amount }: { amount: number }) {
  return (
    <h1 className="text-foreground flex items-center gap-1 text-3xl tracking-tighter">
      <span className="text-muted-foreground text-2xl">₦</span>
      {amount.toLocaleString()}
    </h1>
  );
}

function LoanListItemNumber({ number }: { number: string }) {
  return (
    <p className="text-muted-foreground max-w-sm truncate text-sm font-medium">
      {number}
    </p>
  );
}

function LoanListItemProgress({
  totalPayment,
  principalAmount,
  percentage,
}: {
  totalPayment: number;
  principalAmount: number;
  percentage: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs">
          {formatCurrency(totalPayment, "NGN")} paid down
        </p>
        <p className="text-muted-foreground text-xs">
          {formatCurrency(principalAmount - totalPayment, "NGN")} left
        </p>
      </div>
      <div className="bg-muted h-1 w-full rounded-full">
        <div
          className="bg-primary h-1 rounded-full"
          style={{
            width: `${percentage}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

function LoanListItemHeader({
  loanType,
  status,
  termMonths,
  interestRate,
}: {
  loanType: LoanType;
  status: LoanStatus;
  termMonths: Loan["termMonths"];
  interestRate: Loan["interestRate"];
}) {
  return (
    <CardHeader className="flex flex-row items-start justify-between lg:items-center">
      <LoanTypeSection loanType={loanType} />
      <div className="flex flex-col items-end gap-4 lg:gap-2">
        <LoanStatusBadge status={status} />
        <div className="flex items-center gap-2">
          <Badge variant={"secondary"} className="text-muted-foreground">
            {termMonths} Months
          </Badge>
          <Badge variant={"secondary"} className="text-muted-foreground">
            {interestRate}% / mo
          </Badge>
        </div>
      </div>
    </CardHeader>
  );
}

function LoanStatusBadge({ status }: { status: LoanStatus }) {
  const { bg, color, border, label, dot } = LOAN_STATUS_BADGE[status];

  return (
    <Badge
      style={{ background: bg, color, border: `1px solid ${border}` }}
      className="badge"
    >
      {dot && (
        <span className="size-1 rounded-full" style={{ background: color }} />
      )}
      {label}
    </Badge>
  );
}

export function LoanStatusAlert({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-lg px-4 py-4 text-xs",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function LoanStatusAlertIcon({ className }: { className?: string }) {
  return (
    <HugeiconsIcon
      icon={InformationCircleIcon}
      size={14}
      strokeWidth={2}
      className={cn("shrink-0", className)}
    />
  );
}

export function LoanStatusAlertLabel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <span className={cn("font-medium", className)}>{children}</span>;
}

export function LoanStatusAlertMessage({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <span className={cn(className)}>{children}</span>;
}

export function LoanStatusAlertWithStatus({ status }: { status: LoanStatus }) {
  const { bg, color, border, label, alertLabel } = LOAN_STATUS_BADGE[status];

  return (
    <LoanStatusAlert
      className="flex flex-row items-center gap-2"
      style={{ background: bg, color, border: `1px solid ${border}` }}
    >
      <LoanStatusAlertIcon />
      <LoanStatusAlertMessage>{alertLabel}</LoanStatusAlertMessage>
    </LoanStatusAlert>
  );
}
