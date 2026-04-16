import { useMemo } from "react";
import SummaryCard from "../../dashboard/components/summary-card";
import { useUsers } from "../hooks";

export function SummaryCards() {
  const { data, error, isPending } = useUsers();
  const users = data?.content || [];
  const activeUsers = useMemo(
    () => users.filter((user) => user.isActive).length,
    [users],
  );
  const percentageActive = useMemo(
    () => (users.length > 0 ? (activeUsers / users.length) * 100 : 0),
    [activeUsers, users.length],
  );
  const inactiveUsers = users.length - activeUsers;
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <SummaryCard title="Total Users" value={String(users.length)}>
        <p className="text-muted-foreground text-xs">Registered</p>
      </SummaryCard>
      <SummaryCard title="Active Users" value={String(activeUsers)}>
        <p className="text-muted-foreground text-xs">
          {percentageActive.toFixed(1)}% of total
        </p>
      </SummaryCard>
      <SummaryCard title="Inactive" value={String(inactiveUsers)}>
        <p className="text-muted-foreground text-xs">Deactivated</p>
      </SummaryCard>
    </div>
  );
}
