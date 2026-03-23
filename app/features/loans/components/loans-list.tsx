import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn, formatCurrency } from '@/lib/utils';
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react';
import { format } from 'date-fns';
import { Tabs } from './your-loans-section';
import { percentagePaid, totalPaid } from '@/lib/loan-utils';
import { useLoans } from '../hooks';
import { Loan, LoanStatus, LoanType } from '@/types';
import {
  Alert,
  AlertCircle,
  Briefcase,
  House02Icon,
  InformationCircleIcon,
  User,
} from '@hugeicons/core-free-icons';

const LOANS: Loan[] = [
  {
    id: 1,
    loanNumber: 'LND-2025-001',
    loanType: 'PERSONAL',
    principalAmount: 1200000,
    interestRate: 3.4,
    termMonths: 12,
    monthlyPayment: 150000,
    outstandingBalance: 396000,
    status: 'ACTIVE',
    applicationDate: '2025-02-20',
    disbursementDate: '2025-03-01',
    maturityDate: '2026-03-01',
  },
  {
    id: 2,
    loanNumber: 'LND-2025-002',
    loanType: 'BUSINESS',
    principalAmount: 3500000,
    interestRate: 3.4,
    termMonths: 24,
    monthlyPayment: 214900,
    outstandingBalance: 1719200,
    status: 'ACTIVE',
    applicationDate: '2024-08-01',
    disbursementDate: '2024-08-15',
    maturityDate: '2026-08-15',
  },
  {
    id: 3,
    loanNumber: 'LND-2026-003',
    loanType: 'MORTGAGE',
    principalAmount: 15000000,
    interestRate: 3.4,
    termMonths: 36,
    monthlyPayment: 620000,
    outstandingBalance: 15000000,
    status: 'APPROVED',
    applicationDate: '2026-02-10',
    disbursementDate: '2024-08-15',
    maturityDate: '2026-08-15',
  },
  {
    id: 4,
    loanNumber: 'LND-2026-004',
    loanType: 'PERSONAL',
    principalAmount: 800000,
    interestRate: 3.4,
    termMonths: 6,
    monthlyPayment: 154200,
    outstandingBalance: 800000,
    status: 'PENDING',
    applicationDate: '2026-03-15',
    disbursementDate: '2024-08-15',
    maturityDate: '2026-08-15',
  },
  {
    id: 5,
    loanNumber: 'LND-2026-005',
    loanType: 'MORTGAGE',
    principalAmount: 2000000,
    interestRate: 3.4,
    termMonths: 18,
    monthlyPayment: 145000,
    outstandingBalance: 2000000,
    status: 'REJECTED',
    applicationDate: '2026-01-05',
    disbursementDate: '2024-08-15',
    maturityDate: '2026-08-15',
  },
  {
    id: 6,
    loanNumber: 'LND-2023-006',
    loanType: 'MORTGAGE',
    principalAmount: 450000,
    interestRate: 3.4,
    termMonths: 6,
    monthlyPayment: 81600,
    outstandingBalance: 0,
    status: 'CLOSED',
    applicationDate: '2023-08-20',
    disbursementDate: '2023-09-01',
    maturityDate: '2024-03-01',
  },
];

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
    bg: '#EDF5EE',
    color: '#3D6644',
    border: '#D5E7D8',
    label: 'Active',
    dot: true,
  },
  APPROVED: {
    bg: '#E8F3F8',
    color: '#2D6E8A',
    border: '#B5D4E8',
    label: 'Approved',
    alertLabel:
      'Your loan is approved. Funds will be disbursed by our team shortly.',
    dot: true,
  },
  PENDING: {
    bg: '#FEF5E7',
    color: '#8A6200',
    border: '#F5DCB0',
    label: 'Pending review',
    dot: true,
    alertLabel:
      "Application under review. You'll be notified once a decision is made.",
  },
  CLOSED: {
    bg: '#F8F5F0',
    color: '#6B7B72',
    border: 'rgba(28,37,35,0.1)',
    label: 'Closed',
    dot: false,
  },
  REJECTED: {
    bg: '#FCEBEB',
    color: '#8B2020',
    border: '#F5C4C4',
    label: 'Rejected',
    alertLabel: 'This application was not approved. You may apply again.',
    dot: true,
  },
};

export default function LoansList({ currentTab }: { currentTab: Tabs }) {
  const { data } = useLoans();

  const today = new Date();
  return (
    <div className="flex flex-col gap-4">
      {data?.loans
        ?.filter((loan) => {
          if (currentTab === 'all') {
            return true;
          } else {
            return loan.status === currentTab.toUpperCase();
          }
        })
        .map((loan) => (
          <LoanListItem today={today} key={loan.id} {...loan} />
        ))}
    </div>
  );
}

export function LoanListItem({ today, ...props }: { today: Date } & Loan) {
  const totalPayment = totalPaid(props);
  const percentage = percentagePaid(props);
  const outstanding = props.principalAmount - totalPayment;
  return (
    <Card>
      <LoanListItemHeader {...props} />
      <CardContent className="flex flex-col gap-4 py-0">
        <div className="flex flex-col gap-1">
          <LoanItemAmount amount={props.principalAmount} />
          <LoanListItemNumber number={props.loanNumber} />
        </div>

        {props.status === 'ACTIVE' && (
          <LoanListItemProgress
            totalPayment={totalPayment}
            principalAmount={props.principalAmount}
            percentage={percentage}
          />
        )}
        {props.status !== 'ACTIVE' && props.status !== 'CLOSED' && (
          <LoanStatusAlert status={props.status} />
        )}
      </CardContent>
      <CardFooter className="bg-card mx-4 grid grid-cols-3 items-start px-0">
        {props.status === 'ACTIVE' && (
          <>
            <LoanItemFooterItem
              label="Monthly"
              value={formatCurrency(props.monthlyPayment, 'NGN')}
              status={props.status}
              className="pl-0"
            />
            <LoanItemFooterItem
              label="Outstanding"
              value={formatCurrency(outstanding, 'NGN')}
              status={props.status}
              valueClassName="text-amber-600"
            />

            <LoanItemFooterItem
              label="Matures"
              value={format(props.maturityDate, 'PPP')}
              status={props.status}
              className="border-r-0"
            />
          </>
        )}
        {props.status !== 'ACTIVE' && (
          <LoanItemFooterItem
            label="Amount"
            value={formatCurrency(props.principalAmount, 'NGN')}
            status={props.status}
            className="pl-0"
          />
        )}

        {(props.status === 'PENDING' || props.status === 'APPROVED') && (
          <>
            <LoanItemFooterItem
              label="Term"
              value={`${props.termMonths} months`}
              status={props.status}
            />
            <LoanItemFooterItem
              label="Applied"
              value={format(props.applicationDate, 'PPP')}
              status={props.status}
              className="border-r-0"
            />
          </>
        )}

        {props.status === 'REJECTED' && (
          <>
            <LoanItemFooterItem
              label="Applied"
              value={format(props.applicationDate, 'PPP')}
              status={props.status}
            />
          </>
        )}

        {props.status === 'CLOSED' && (
          <>
            <LoanItemFooterItem
              label="Settled"
              value={formatCurrency(totalPayment, 'NGN')}
              status={props.status}
              className="text-chart-4"
            />

            <LoanItemFooterItem
              label="Matured"
              value={format(props.maturityDate, 'PPP')}
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
      <div className="rounded-md flex items-center justify-center ring ring-border bg-secondary size-8">
        <HugeiconsIcon icon={icon[loanType]} size={16} />
      </div>
      <h1 className="text-sm uppercase text-muted-foreground">
        {loanType} loan
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
    <div className={cn('flex flex-col gap-1 border-r pl-4', className)}>
      <h3
        className={cn(
          'text-muted-foreground uppercase text-xs',
          labelClassName,
        )}
      >
        {label}
      </h3>
      <p className={cn('text-base tracking-tighter', valueClassName)}>
        {value}
      </p>
    </div>
  );
}

function LoanItemAmount({ amount }: { amount: number }) {
  return (
    <h1 className="text-foreground text-3xl tracking-tighter flex items-center gap-1">
      <span className="text-muted-foreground text-2xl">₦</span>
      {amount.toLocaleString()}
    </h1>
  );
}

function LoanListItemNumber({ number }: { number: string }) {
  return (
    <p className="text-sm font-medium text-muted-foreground max-w-sm truncate">
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
          {formatCurrency(totalPayment, 'NGN')} paid down
        </p>
        <p className="text-muted-foreground text-xs">
          {formatCurrency(principalAmount - totalPayment, 'NGN')} left
        </p>
      </div>
      <div className="w-full h-1 bg-muted rounded-full">
        <div
          className="rounded-full h-1 bg-primary "
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
  termMonths: Loan['termMonths'];
  interestRate: Loan['interestRate'];
}) {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <LoanTypeSection loanType={loanType} />
      <div className="flex flex-col gap-2 items-end">
        <LoanStatusBadge status={status} />
        <div className="flex items-center gap-2">
          <Badge variant={'secondary'} className="text-muted-foreground">
            {termMonths} Months
          </Badge>
          <Badge variant={'secondary'} className="text-muted-foreground">
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

function LoanStatusAlert({ status }: { status: LoanStatus }) {
  const { bg, color, border, alertLabel, dot } = LOAN_STATUS_BADGE[status];

  return (
    <div
      className="rounded-lg py-4 px-4 text-xs flex items-center gap-2"
      style={{ background: bg, color, border: `1px solid ${border}` }}
    >
      <HugeiconsIcon icon={InformationCircleIcon} size={14} strokeWidth={2} />
      {alertLabel}
    </div>
  );
}
