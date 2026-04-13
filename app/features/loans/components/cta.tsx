import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function Cta() {
  return (
    <Card className="bg-muted/50 flex flex-col gap-2 rounded-lg">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-xs tracking-tight uppercase">
          New Application
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col justify-between lg:flex-row lg:items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-medium tracking-tight lg:text-2xl">
              Need more funds? We're ready
            </h1>
            <p className="text-muted-foreground text-sm tracking-tight">
              Apply for a new personal, business, or mortgage loan and get a
              decision in minutes.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-sm tracking-tight lg:text-lg">
              From{" "}
              <strong className="text-foreground font-medium">3.4% </strong>/
              Month
            </p>
          </div>
        </div>
        <Button className="self-start">
          <Link href={"/loans/apply"}>Start Application</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
