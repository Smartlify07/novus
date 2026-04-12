import SummaryCard from '../../dashboard/components/summary-card';

export function SummaryCards() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <SummaryCard title="Total Users" value={String(12)}>
        <p className="text-muted-foreground text-xs">Registered</p>
      </SummaryCard>
      <SummaryCard title="Active Users" value={String(12)}>
        <p className="text-muted-foreground text-xs">42% of total</p>
      </SummaryCard>
      <SummaryCard title="Inactive" value={String(12)}>
        <p className="text-muted-foreground text-xs">Deactivated</p>
      </SummaryCard>
    </div>
  );
}
