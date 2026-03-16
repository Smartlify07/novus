import React from 'react';
import SummaryCard from '../../dashboard/components/summary-card';

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <SummaryCard title="Total Outstanding" value="₦4,700,000" icon={null}>
        <p className="text-muted-foreground">2 active loans</p>
      </SummaryCard>
      <SummaryCard title="Total Outstanding" value="₦4,700,000" icon={null}>
        <p className="text-accent-foreground">216k due</p>
      </SummaryCard>
      <SummaryCard title="Monthly payments" value="₦339,000" icon={null}>
        <p className="text-muted-foreground">across all active loans</p>
      </SummaryCard>
      <SummaryCard title="Credit score" value="742" icon={null}>
        <p className="text-muted-foreground">12 pts this month</p>
      </SummaryCard>
    </div>
  );
}
