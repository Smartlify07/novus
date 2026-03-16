import { Button } from '@/components/ui/button';
import React from 'react';

export default function Cta() {
  return (
    <section className="bg-primary/5 rounded-md flex flex-col p-6 gap-4">
      <h4 className="text-xs text-muted-foreground uppercase">
        New Application
      </h4>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0">
            <h1 className="text-2xl font-medium">
              Need more funds? We're ready
            </h1>
            <p className="text-muted-foreground text-sm">
              Apply for a new personal, business, or mortgage loan and get a
              decision in minutes.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium">3.4%</h1>
            <p className="text-xs uppercase text-muted-foreground">
              From / Month
            </p>
          </div>
        </div>
        <Button className="self-start">Start Application</Button>
      </div>
    </section>
  );
}
