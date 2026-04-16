"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import SummaryCard from "../summary-card";
import { ArrowUp02Icon, Refresh } from "@hugeicons/core-free-icons";
import { formatCurrency } from "@/lib/utils";
import { useAdminDashboardStats } from "../../hooks";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import InlineErrorStateCard from "@/components/inline-error-state-card";

function SummaryCardSkeleton() {
  return (
    <Card className="flex flex-row gap-0 rounded-md px-4 shadow-none">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <CardHeader className="text-muted-foreground flex items-center gap-2 px-0 text-sm">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent className="px-0">
            <Skeleton className="h-8 w-40" />
          </CardContent>
        </div>
        <CardFooter className="bg-card rounded-none border-none px-0 pt-1 pb-4">
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
      <div className="grid gap-6 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SummaryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <InlineErrorStateCard
        className="py-10"
        title="Platform overview unavailable"
        description="We couldn't load your key metrics right now. This may be a temporary issue, try refreshing to get the latest figures."
        actions={[{ label: "Refresh", icon: Refresh }]}
      />
    );
  }
  return (
    <div className="grid items-center gap-6 lg:grid-cols-4">
      <SummaryCard
        title="Total deposits"
        value={formatCurrency(totalDeposits, "NGN")}
        icon={null}
      >
        <p className="text-chart-4 flex items-center gap-1 text-xs">
          <HugeiconsIcon icon={ArrowUp02Icon} size={14} /> Capital held
        </p>
      </SummaryCard>
      <SummaryCard
        title="Loan portfolio"
        value={formatCurrency(totalLoans, "NGN")}
        icon={null}
      >
        <p className="text-muted-foreground flex items-center gap-1 text-xs">
          21% of deposits deployed
        </p>
      </SummaryCard>
      <SummaryCard title="Total users" value={String(totalUsers)} icon={null}>
        <p className="text-muted-foreground flex items-center gap-1 text-xs">
          {percentageOfUsersWithAccounts}% have accounts{" "}
        </p>
      </SummaryCard>
      <SummaryCard
        title="Pending loan reviews"
        value={String(totalPendingLoans)}
        icon={null}
      >
        <p className="text-muted-foreground flex items-center gap-1 text-xs">
          Require attention
        </p>
      </SummaryCard>
    </div>
  );
}
