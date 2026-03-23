'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import LoansList from './loans-list';
import { Badge } from '@/components/ui/badge';
import { Loan, LoanStatus, LoanType } from '@/types';

export type Tabs = LoanStatus | 'ALL';

const tabs: Tabs[] = [
  'ALL',
  'ACTIVE',
  'APPROVED',
  'PENDING',
  'REJECTED',
  'CLOSED',
];
export default function YourLoansSection({
  onLoanClick,
}: {
  onLoanClick?: (loan: Loan) => void;
}) {
  const [activeTab, setActiveTab] = useState<Tabs>('ALL');
  const changeTab = (tab: Tabs) => {
    setActiveTab(tab);
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-foreground text-sm uppercase">Your Loans</h1>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <Badge
              key={tab}
              onClick={() => changeTab(tab as Tabs)}
              variant={activeTab === tab ? 'default' : 'outline'}
              className="capitalize rounded-full text-xs cursor-pointer py-2 px-4"
            >
              {tab}
            </Badge>
          ))}
        </div>
      </div>

      <LoansList currentTab={activeTab} onLoanClick={onLoanClick} />
    </section>
  );
}
