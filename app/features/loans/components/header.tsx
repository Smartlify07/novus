import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useLoans } from "../hooks";

export default function Header() {
  const { data: loans } = useLoans();
  const activeLoans =
    loans?.loans.filter((loan) => loan.status === "ACTIVE").length || 0;
  const totalLoans = loans?.loans.length || 0;
  return (
    <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div className="flex flex-col gap-1">
        <h3 className="text-muted-foreground text-xs uppercase">My Loans</h3>
        <h1 className="text-foreground text-3xl">
          <span className="">Loans</span> & Credit
        </h1>

        <p className="text-muted-foreground flex items-center gap-1 text-sm">
          <span>{activeLoans} active loans</span>{" "}
          <span className="bg-muted-foreground size-0.5 rounded-full"></span>{" "}
          <span>{totalLoans} total</span>
        </p>
      </div>

      <div className="flex items-center gap-2 lg:self-end">
        <Button className="" variant={"outline"}>
          Export
        </Button>
        <Button asChild className="" variant={"default"}>
          <Link href="/loans/apply">Apply for a loan</Link>
        </Button>
      </div>
    </section>
  );
}
