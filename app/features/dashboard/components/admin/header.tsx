import { format } from "date-fns";
import React from "react";

const Header = () => {
  const todaysDate = format(new Date(), "EEEE, PPP");
  return (
    <header className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-0">
      <div className="flex flex-col gap-1">
        <h4 className="text-muted-foreground text-sm uppercase">Overview</h4>
        <h1 className="text-2xl font-medium tracking-tighter">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Here's where everything stands today.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium">{todaysDate}</h3>
        <h4 className="text-muted-foreground text-xs">Last updated just now</h4>
      </div>
    </header>
  );
};

export default Header;
