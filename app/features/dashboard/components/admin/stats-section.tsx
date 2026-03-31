'use client';
import React from 'react';
import {
  StatCard,
  StatCardDescription,
  StatCardIcon,
  StatCardTitle,
  StatCardValue,
} from './stat-card';
import { formatCurrency } from '@/lib/utils';
import { useAdminDashboardStats } from '../../hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Money01Icon,
  MoneyBag01Icon,
  MoneyBag02Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';

function StatsCardsSkeleton() {
  return (
    <StatCard>
      <div className="flex items-start gap-4">
        <Skeleton className="rounded-lg size-10 w-10 h-10" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </StatCard>
  );
}

export default function StatsSection() {
  const { data, error, isPending } = useAdminDashboardStats();

  const totalLoans = data?.totalLoans ?? 0;
  const totalDeposits = data?.totalDeposits ?? 0;
  const idleCapital = totalDeposits - totalLoans;
  const totalActiveAccounts = data?.activeAccounts ?? 0;
  const totalActiveLoans = data?.activeLoans ?? 0;
  const totalAccounts = data?.totalAccounts ?? 0;
  const averageLoanSize = totalLoans / totalActiveLoans;
  const activeAccountsPercentage =
    totalAccounts > 0 ? (totalActiveAccounts / totalAccounts) * 100 : 0;

  if (isPending) {
    return (
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <StatsCardsSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <>An error occurred {error.message}</>;
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      <StatCard>
        <div className="flex items-start gap-4">
          <StatCardIcon className="rounded-lg bg-chart-4/10 size-10 flex items-center justify-center">
            <HugeiconsIcon icon={Money01Icon} className="text-chart-4" />
          </StatCardIcon>
          <div className="flex flex-col gap-1">
            <StatCardTitle className="font-medium">Idle Capital</StatCardTitle>
            <StatCardDescription>
              Deposits not yet deployed as loans
            </StatCardDescription>
            <StatCardValue className="tracking-tighter font-normal">
              {formatCurrency(idleCapital, 'NGN')}
            </StatCardValue>
          </div>
        </div>
      </StatCard>

      <StatCard>
        <div className="flex items-start gap-4">
          <StatCardIcon className="rounded-lg bg-blue-600/10 size-10 justify-center items-center flex">
            <HugeiconsIcon icon={UserIcon} className="text-blue-600" />
          </StatCardIcon>
          <div className="flex flex-col gap-1">
            <StatCardTitle className="font-medium">
              Active accounts
            </StatCardTitle>
            <StatCardDescription>
              {totalActiveAccounts} of {totalAccounts} accounts are active{' '}
            </StatCardDescription>
            <StatCardValue className="tracking-tight">
              {activeAccountsPercentage}%
            </StatCardValue>
          </div>
        </div>
      </StatCard>

      <StatCard>
        <div className="flex items-start gap-4">
          <StatCardIcon className="rounded-lg bg-amber-700/10 flex items-center justify-center size-10">
            <HugeiconsIcon icon={MoneyBag02Icon} className="text-amber-700" />
          </StatCardIcon>
          <div className="flex flex-col gap-1">
            <StatCardTitle className="font-medium">
              Avg. Loan Size
            </StatCardTitle>
            <StatCardDescription>
              Across {totalActiveLoans} active loan{' '}
            </StatCardDescription>
            <StatCardValue className="tracking-tight">
              {formatCurrency(averageLoanSize, 'NGN')}
            </StatCardValue>
          </div>
        </div>
      </StatCard>
    </div>
  );
}
