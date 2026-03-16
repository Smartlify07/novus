'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import LoansList from './loans-list';

type Tabs = 'active' | 'closed' | 'all';
const tabs = ['active', 'closed', 'all'];
export default function YourLoansSection() {
  const [activeTab, setActiveTab] = useState<Tabs>('active');
  const changeTab = (tab: Tabs) => {
    setActiveTab(tab);
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-foreground text-sm uppercase">Your Loans</h1>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => changeTab(tab as Tabs)}
              variant={activeTab === tab ? 'default' : 'outline'}
              className="capitalize rounded-full text-xs"
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      <LoansList />
    </section>
  );
}
