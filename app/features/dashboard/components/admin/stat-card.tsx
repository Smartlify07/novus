import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

export function StatCard({ className, children }: React.ComponentProps<"div">) {
  return <Card className={cn("px-4", className)}>{children}</Card>;
}

export function StatCardTitle({
  className,
  children,
}: React.ComponentProps<"div">) {
  return (
    <CardTitle className={cn("text-foreground text-sm font-normal", className)}>
      {children}
    </CardTitle>
  );
}

export function StatCardDescription({
  className,
  children,
}: React.ComponentProps<"div">) {
  return (
    <CardDescription
      className={cn("text-sm font-normal lg:text-base", className)}
    >
      {children}
    </CardDescription>
  );
}

export function StatCardValue({
  className,
  children,
}: React.ComponentProps<"div">) {
  return (
    <CardTitle className={cn("text-xl font-normal lg:text-2xl", className)}>
      {children}
    </CardTitle>
  );
}

export function StatCardIcon({
  className,
  children,
}: React.ComponentProps<"div">) {
  return <div className={cn(className)}>{children}</div>;
}
