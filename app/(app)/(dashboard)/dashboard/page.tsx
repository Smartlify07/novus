import AccountNumberCard from '@/app/features/dashboard/components/account-number-card';
import GreetingSection from '@/app/features/dashboard/components/greeting-section';
import SummaryCard from '@/app/features/dashboard/components/summary-card';
import {
  calculateDaysUntilDue,
  calculateDueDate,
  calculatePercentageChange,
  cn,
} from '@/lib/utils';
import {
  ArrowDown02Icon,
  ArrowRight02Icon,
  ArrowUp02Icon,
  Calendar03Icon,
  CreditCardIcon,
  Wallet01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

export default function DashboardPage() {
  const availableBalanceChange = calculatePercentageChange(10000, 9999);
  const nextPaymentDueDate = '2026-07-15';
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between  gap-6">
        <GreetingSection />
        <AccountNumberCard
          accountName="Obinna Smart Anosike"
          accountNumber="1234567890"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          title="Available Balance"
          value="₦12,345.67"
          icon={<HugeiconsIcon size={20} icon={Wallet01Icon} stroke="1" />}
          percentageChange={20}
        >
          {availableBalanceChange >= 0 ? (
            <div className="flex items-center gap-1 text-sm font-medium text-green-500">
              <HugeiconsIcon size={20} icon={ArrowUp02Icon} />
              {availableBalanceChange.toFixed(2)}%{' '}
              <span className="text-muted-foreground">vs last month</span>
            </div>
          ) : (
            <span className="flex items-center gap-1 text-sm font-medium text-destructive">
              <HugeiconsIcon size={20} icon={ArrowDown02Icon} />
              {availableBalanceChange.toFixed(2)}%
              <span className="text-muted-foreground">vs last month</span>
            </span>
          )}
        </SummaryCard>
        <SummaryCard
          title="Credit Limit"
          value="₦121,000.00"
          icon={<HugeiconsIcon size={20} icon={CreditCardIcon} stroke="1" />}
        >
          <Link
            href={'/loans/apply'}
            className="text-sm font-medium flex items-center gap-1 px-2 text-primary hover:underline"
          >
            Apply for Credit
            <HugeiconsIcon size={20} icon={ArrowRight02Icon} stroke="1" />
          </Link>
        </SummaryCard>
        <SummaryCard
          title="Next Payment Due"
          value="₦2,345.67"
          icon={<HugeiconsIcon size={20} icon={Calendar03Icon} stroke="1" />}
        >
          <span
            className={cn(
              'text-sm font-medium text-muted-foreground px-2',
              calculateDaysUntilDue(new Date(nextPaymentDueDate)) <= 7
                ? 'text-destructive'
                : '',
            )}
          >
            {calculateDaysUntilDue(new Date(nextPaymentDueDate))} days until due
          </span>
        </SummaryCard>
      </div>
    </div>
  );
}
