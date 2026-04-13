import { Account } from "@/types";
import { cn, formatCurrency, splitAccountNumber } from "@/lib/utils";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Card } from "@/components/ui/card";

type RepaymentAccountListProps = {
  accounts: Account[];
  selectedAccountId?: number | null;
  onSelect: (accountId: number) => void;
};

export default function RepaymentAccountList({
  accounts,
  selectedAccountId,
  onSelect,
}: RepaymentAccountListProps) {
  return (
    <div className="flex flex-col gap-3">
      <FieldLabel className="p-0 text-sm font-medium">Paying from</FieldLabel>
      <div className="flex flex-col gap-2">
        {accounts.map((account) => (
          <Card
            key={account.id}
            onClick={() => onSelect(account.id)}
            className={cn(
              "flex flex-row items-center justify-between rounded-xl px-4 py-3 text-left transition-colors",
              account.id === selectedAccountId
                ? ""
                : "border-border bg-card hover:bg-muted/40",
            )}
          >
            <div className="flex flex-col gap-1">
              <span className="text-foreground text-sm font-medium capitalize">
                {account.accountType.toLowerCase().replace("_", " ")} account
              </span>
              <span className="text-muted-foreground text-xs">
                {splitAccountNumber(account.accountNumber, 3, 4)}
              </span>
            </div>
            <span className="text-foreground text-sm font-medium">
              {formatCurrency(account.balance, account.currency)}
            </span>
          </Card>
        ))}
      </div>
      {!accounts.length && (
        <FieldError>No eligible account was found for this payment.</FieldError>
      )}
    </div>
  );
}
