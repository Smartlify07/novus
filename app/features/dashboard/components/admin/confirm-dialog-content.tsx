import { convertToCapitalized } from "@/app/features/loans/repayment/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils";
import { Loan } from "@/types";
import { format } from "date-fns";
import { useState } from "react";

export function ConfirmDialogContent({
  loan,
  type,
  onClick,
  onInterestRateChange,
}: {
  loan: Loan;
  type: "reject" | "approve" | null;
  onClick: () => void;
  onInterestRateChange?: (value: number) => void;
}) {
  const [interestRate, setInterestRate] = useState(loan.interestRate);
  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader className="gap-0">
        <DialogTitle className="text-lg">
          {type === "approve" ? "Approve Loan?" : "Reject Application?"}
        </DialogTitle>
        <DialogDescription className="text-muted-foreground flex items-center gap-2">
          {loan.loanNumber}{" "}
          <span className="bg-muted-foreground size-1 rounded-full"></span>{" "}
          Obinna Anosike
        </DialogDescription>
      </DialogHeader>

      <div className="bg-muted rounded-lg p-4">
        <div className="grid grid-cols-2 gap-y-2">
          <Item
            label="Amount"
            value={formatCurrency(loan.principalAmount, "NGN")}
          />
          <Item label="Type" value={convertToCapitalized(loan.loanType)} />
          <Item label="Term" value={`${loan.termMonths} months`} />
          <Item label="Applied" value={format(loan.applicationDate, "PPP")} />
        </div>
      </div>

      {type === "approve" && (
        <div className="flex flex-col gap-4">
          <FieldSet>
            <FieldLegend data-variant="label" className="text-sm">
              Interest rate
            </FieldLegend>
            <Input
              type="number"
              placeholder="Enter a new interest rate"
              value={interestRate}
              onChange={(e) => {
                setInterestRate(Number(e.target.value));
                onInterestRateChange?.(Number(e.target.value));
              }}
            />
          </FieldSet>
          <FieldSet>
            <FieldLegend data-variant="label" className="text-sm">
              Comments{" "}
            </FieldLegend>
            <Textarea placeholder="Describe briefly what you want the applicant to know" />
          </FieldSet>
        </div>
      )}
      <DialogDescription>
        {type === "approve"
          ? "Approving notifies the applicant. Disbursement happens separately once you confirm."
          : "Rejecting notifies the applicant that their application was declined. This cannot be undone."}
      </DialogDescription>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button
          variant={type === "reject" ? "destructive" : "default"}
          type="submit"
          onClick={() => onClick()}
        >
          {type === "approve" ? "Approve" : "Reject"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-muted-foreground text-xs">{label}</h4>
      <h4 className="text-foreground text-base tracking-tighter">{value}</h4>
    </div>
  );
}
