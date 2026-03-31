import { format } from 'date-fns';
import React from 'react';

const Header = () => {
  const todaysDate = format(new Date(), 'EEEE, PPP');
  return (
    <header className="flex items-end justify-between">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm text-muted-foreground uppercase">Overview</h4>
        <h1 className="text-2xl font-medium tracking-tighter">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Here's where everything stands today.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-sm">{todaysDate}</h3>
        <h4 className="text-xs text-muted-foreground">Last updated just now</h4>
      </div>
    </header>
  );
};

export default Header;
