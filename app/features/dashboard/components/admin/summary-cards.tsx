'use client';
import { HugeiconsIcon } from '@hugeicons/react';
import SummaryCard from '../summary-card';
import { ArrowUp02Icon } from '@hugeicons/core-free-icons';
import { formatCurrency } from '@/lib/utils';
import { useAdminDashboardStats } from '../../hooks';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function SummaryCardSkeleton() {
  return (
    <Card className="gap-0 flex flex-row px-4 rounded-md shadow-none">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <CardHeader className="flex items-center gap-2 px-0 text-sm text-muted-foreground">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent className="px-0">
            <Skeleton className="h-8 w-40" />
          </CardContent>
        </div>
        <CardFooter className="rounded-none bg-card border-none px-0 pt-1 pb-4">
          <Skeleton className="h-4 w-40" />
        </CardFooter>
      </div>
    </Card>
  );
}
export default function SummaryCards() {
  const { data, error, isPending } = useAdminDashboardStats();

  const totalLoans = data?.totalLoans ?? 0;
  const totalDeposits = data?.totalDeposits ?? 0;
  const totalUsers = data?.totalUsers ?? 0;
  const totalAccounts = data?.totalAccounts ?? 0;
  const percentageOfUsersWithAccounts = Math.floor(
    (totalAccounts / totalUsers) * 100,
  );
  const totalPendingLoans = data?.pendingLoans ?? 0;

  if (isPending) {
    return (
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SummaryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <>An error occurred {error.message}</>;
  }
  return (
    <div className="grid grid-cols-4 items-center gap-6">
      <SummaryCard
        title="Total deposits"
        value={formatCurrency(totalDeposits, 'NGN')}
        icon={null}
      >
        <p className="flex items-center gap-1 text-xs text-chart-4">
          <HugeiconsIcon icon={ArrowUp02Icon} size={14} /> Capital held
        </p>
      </SummaryCard>
      <SummaryCard
        title="Loan portfolio"
        value={formatCurrency(totalLoans, 'NGN')}
        icon={null}
      >
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          21% of deposits deployed
        </p>
      </SummaryCard>
      <SummaryCard title="Total users" value={String(totalUsers)} icon={null}>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          {percentageOfUsersWithAccounts}% have accounts{' '}
        </p>
      </SummaryCard>
      <SummaryCard
        title="Pending loan reviews"
        value={String(totalPendingLoans)}
        icon={null}
      >
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          Require attention
        </p>
      </SummaryCard>
    </div>
  );
}
