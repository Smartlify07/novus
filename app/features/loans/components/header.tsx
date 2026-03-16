import { Button } from '@/components/ui/button';
import React from 'react';

export default function Header() {
  return (
    <section className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h3 className="text-xs uppercase">My Loans</h3>
        <h1 className="text-muted-foreground text-3xl">
          <span className="text-primary">Loans</span> & Credit
        </h1>

        <p className="text-muted-foreground text-sm flex items-center gap-1">
          <span>2 active loans</span> <span>.</span> <span>3 total</span>
        </p>
      </div>

      <div className="flex items-center gap-2 self-end">
        <Button className="" variant={'outline'}>
          Export
        </Button>
        <Button className="" variant={'default'}>
          Apply for a loan
        </Button>
      </div>
    </section>
  );
}
