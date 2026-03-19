import React from 'react';

export default function Header() {
  return (
    <header className="flex flex-col gap-2">
      <h3 className="text-muted-foreground uppercase tracking-tighter text-xs">
        Apply
      </h3>
      <h1 className="text-3xl tracking-tighter">New Loan Application</h1>
      <p className="text-muted-foreground tracking-tighter text-sm">
        Complete the steps below to get a loan
      </p>
    </header>
  );
}
