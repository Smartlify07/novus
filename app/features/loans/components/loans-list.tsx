import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn, formatCurrency } from '@/lib/utils';
import {
  Briefcase,
  GlobalEducationIcon,
  User,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { format } from 'date-fns';
import { Tabs } from './your-loans-section';
const LOANS = [
  {
    id: 'LND-2024-001',
    type: 'PERSONAL',
    icon: User,
    iconBg: 'var(--sage-mist)',
    principalAmount: 1200000,
    disbursedAmount: 1200000,
    termMonths: 12,
    monthlyRate: 0.034,
    disbursedDate: '2025-03-01',
    purpose: 'Home renovation and furniture purchase for new apartment',
    status: 'ACTIVE',
    paymentsCompleted: 5,
    nextDueDate: '2025-08-15',
    processingFee: 12000,
  },
  {
    id: 'LND-2024-002',
    type: 'BUSINESS',
    icon: Briefcase,
    iconBg: 'var(--sand-light)',
    principalAmount: 3500000,
    disbursedAmount: 3500000,
    termMonths: 24,
    monthlyRate: 0.034,
    disbursedDate: '2024-08-15',
    purpose: 'Procurement of inventory and warehouse expansion',
    status: 'ACTIVE',
    paymentsCompleted: 9,
    nextDueDate: '2025-05-15',
    processingFee: 35000,
  },
  {
    id: 'LND-2023-003',
    type: 'EDUCATION',
    icon: GlobalEducationIcon,
    iconBg: 'var(--cream)',
    principalAmount: 450000,
    disbursedAmount: 450000,
    termMonths: 6,
    monthlyRate: 0.034,
    disbursedDate: '2023-09-01',
    purpose: 'University tuition and academic materials',
    status: 'CLOSED',
    paymentsCompleted: 6,
    nextDueDate: null,
    processingFee: 4500,
  },
];

export default function LoansList({ currentTab }: { currentTab: Tabs }) {
  return (
    <div className="flex flex-col gap-4">
      {LOANS.filter((loan) => {
        if (currentTab === 'all') {
          return true;
        } else {
          return loan.status === currentTab.toUpperCase();
        }
      }).map((loan) => (
        <LoanListItem key={loan.id} {...loan} />
      ))}
    </div>
  );
}

const calcMonthly = (p: number, r: number, n: number) =>
  (p * r) / (1 - Math.pow(1 + r, -n));

export function LoanListItem({ ...props }: (typeof LOANS)[number]) {
  const percentageCompleted =
    (props.paymentsCompleted / props.termMonths) * 100;
  const monthlyRateAmount = calcMonthly(
    props.principalAmount,
    props.monthlyRate,
    props.termMonths,
  );
  const totalPayment = monthlyRateAmount * props.termMonths;
  let date;
  if (props.nextDueDate) {
    date = new Date(props.nextDueDate);
  } else {
    date = '';
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-md flex items-center justify-center ring ring-border bg-secondary size-8">
            <HugeiconsIcon icon={props.icon} size={16} />
          </div>
          <h1 className="text-sm uppercase text-muted-foreground">
            {props.type} loan
          </h1>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <Badge
            className={cn(
              'flex items-center gap-1 text-xs',
              props.status === 'ACTIVE' && 'bg-green-700/10 text-green-700',
              props.status === 'CLOSED' && 'bg-secondary text-muted-foreground',
            )}
            variant={props.status === 'CLOSED' ? 'secondary' : 'default'}
          >
            <span
              className={cn(
                'rounded-full size-1',
                props.status === 'CLOSED'
                  ? 'bg-muted-foreground'
                  : 'bg-green-700',
              )}
            ></span>
            {props.status}
          </Badge>

          <div className="flex items-center gap-2">
            <Badge variant={'secondary'} className="text-muted-foreground">
              {props.termMonths} Months
            </Badge>
            <Badge variant={'secondary'} className="text-muted-foreground">
              {props.id}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 py-0">
        <div className="flex flex-col gap-1">
          <h1 className="text-foreground text-3xl tracking-tighter flex items-center gap-1">
            <span className="text-muted-foreground text-2xl">₦</span>
            {props.disbursedAmount.toLocaleString()}
          </h1>
          <p className="text-sm font-medium text-muted-foreground max-w-sm truncate">
            {props.purpose}
          </p>
        </div>

        {props.status === 'ACTIVE' && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs">
                {props.paymentsCompleted} of {props.termMonths} payments made
              </p>
              <p className="text-muted-foreground text-xs">
                {Math.round(percentageCompleted)}% complete
              </p>
            </div>
            <div className="w-full h-1 bg-muted rounded-full">
              <div
                className="rounded-full h-1 bg-primary "
                style={{
                  width: `${Math.round(percentageCompleted)}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-card mx-4 grid grid-cols-3 items-start px-0">
        <div className="flex flex-col gap-1 border-r pr-4">
          <h3 className="text-muted-foreground uppercase text-xs">Monthly</h3>
          <p className="text-foreground  text-base tracking-tighter">
            ₦{monthlyRateAmount.toLocaleString()}
          </p>
        </div>
        {props.status === 'ACTIVE' && (
          <>
            <div className="flex flex-col gap-1 border-r pl-4">
              <h3 className="text-muted-foreground uppercase text-xs">
                Next Due
              </h3>
              {props.nextDueDate && (
                <p className="text-amber-600 text-base tracking-tighter">
                  {format(date, 'PPP')}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 pl-4">
              <h3 className="text-muted-foreground uppercase text-xs">
                Remaining
              </h3>
              <p className="text-foreground text-base tracking-tighter">
                {props.termMonths - props.paymentsCompleted} payments
              </p>
            </div>
          </>
        )}
        {props.status === 'CLOSED' && (
          <>
            <div className="flex flex-col gap-1 border-r pl-4">
              <h3 className="text-muted-foreground uppercase text-xs">
                Completed
              </h3>
              <p className="text-chart-5 text-base tracking-tighter">
                Paid off
              </p>
            </div>

            <div className="flex flex-col gap-1 pl-4">
              <h3 className="text-muted-foreground uppercase text-xs">
                Total paid
              </h3>
              <p className="text-foreground text-base tracking-tighter">
                ₦{Math.round(totalPayment).toLocaleString()}
              </p>
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
