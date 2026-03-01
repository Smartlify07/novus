import AccountSourceCard from '@/app/features/transfer/components/account-source-card';
import React from 'react';

export default function page() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <header>
        <h1 className="font-semibold text-2xl">Start your transfer</h1>
      </header>
      <AccountSourceCard />
    </div>
  );
}
