'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import { useAdminDashboardStats } from '../../hooks';
import { formatCurrency } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { HugeiconsIcon } from '@hugeicons/react';
import { Alert, Refresh } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import InlineErrorStateCard from '@/components/inline-error-state-card';

export default function CapitalDeploymentCard() {
  const { data, error, isPending } = useAdminDashboardStats();
  const totalDeposits = data?.totalDeposits ?? 0;
  const totalLoans = data?.totalLoans ?? 0;
  const totalActiveLoans = data?.activeLoans ?? 0;
  const totalIdle = totalDeposits - totalLoans;

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-20" />
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="h-2 w-20" />
            <Skeleton className="h-1 w-full" />
          </div>
        </CardContent>
        <CardFooter className="bg-card">
          <div className="flex items-center justify-between gap-4 w-full">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-0.5 w-full">
                <Skeleton className="h-2 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
    );
  }

  if (error) {
    return (
      <InlineErrorStateCard
        title="Unable to get capital deployment stats"
        description="We were unable to get details of the capital deployment statistics"
        actions={[{ label: 'Try again', icon: Refresh }]}
      />
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Capital deployment</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col">
          <CardTitle className="text-muted-foreground text-sm">
            Total Deposits
          </CardTitle>
          <h1 className="text-3xl font-medium tracking-tighter">
            {formatCurrency(totalDeposits, 'NGN')}
          </h1>
        </div>
        <PercentageMeter
          totalDeposits={totalDeposits}
          totalLoans={totalLoans}
        />
      </CardContent>
      <CardFooter className="bg-card">
        <div className="flex items-center justify-between w-full gap-4">
          <FooterItem
            label="Deployed"
            value={formatCurrency(totalDeposits, 'NGN')}
          />
          <FooterItem label="Idle" value={formatCurrency(totalIdle, 'NGN')} />
          <FooterItem label="Active Loans" value={totalActiveLoans} />
        </div>
      </CardFooter>
    </Card>
  );
}

function FooterItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <Label className="text-xs text-muted-foreground ">{label}</Label>
      <p className="text-base font-medium tracking-tighter">{value}</p>
    </div>
  );
}

function PercentageMeter({
  totalDeposits,
  totalLoans,
}: {
  totalDeposits: number;
  totalLoans: number;
}) {
  const percentage = Math.floor(
    totalDeposits > 0 ? (totalLoans / totalDeposits) * 100 : 0,
  );
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <Label className="text-xs text-primary">{percentage}% deployed</Label>
      </div>
      <div className="rounded-lg h-1 w-full bg-muted">
        <div
          className="bg-primary h-1 rounded-lg"
          style={{
            width: `${percentage}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
