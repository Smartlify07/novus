import { useTransferWorkflowStore } from "@/store/transfer-workflow-store";
import { useAccounts } from "@/app/features/accounts/hooks";
import RecipientBadge from "./recepient-badge";
import AccountSourceCard from "./account-source-card";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, maskAccountNumber } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const TRANSFER_FEE = 10;

export default function ReviewTransferStep() {
  const data = useTransferWorkflowStore((s) => s.data);
  const setData = useTransferWorkflowStore((s) => s.setData);

  const { data: accounts } = useAccounts();

  const sourceAccount = accounts?.find(
    (account) => account.id === data.sourceAccountId,
  );

  const recipientName = data.recepient
    ? `${data.recepient.user.firstName} ${data.recepient.user.lastName}`
    : null;
  const recipientAccountNumber = data.destinationAccountNumber;

  const amount = data.amount ?? 0;
  const transferFee = TRANSFER_FEE;
  const totalDebit = amount + transferFee;

  return (
    <div className="flex w-full max-w-full flex-col gap-10 self-center">
      <RecipientBadge
        recepientName={recipientName}
        accountNumber={recipientAccountNumber}
      />

      <Card className="bg-muted/50 rounded-md p-6">
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-muted-foreground text-sm">You are sending</p>
            <p className="text-4xl font-semibold tracking-tight">
              {formatCurrency(amount, "NGN")}
            </p>
          </div>

          <Separator />

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">Amount</p>
              <p className="text-foreground font-medium">
                {formatCurrency(amount, "NGN")}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">Transfer Fee</p>
              <p className="text-foreground font-medium">
                {formatCurrency(transferFee, "NGN")}
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <p className="text-foreground font-semibold">Total Debit</p>
              <p className="text-foreground text-lg font-semibold">
                {formatCurrency(totalDebit, "NGN")}
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">From</p>
            <p className="text-foreground font-medium">
              {sourceAccount
                ? `${sourceAccount.accountType.charAt(0)}${sourceAccount.accountType.slice(1).toLowerCase()} - ${maskAccountNumber(sourceAccount.accountNumber)}`
                : "Unknown"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Field>
        <FieldLabel>Description (Optional)</FieldLabel>
        <Textarea
          placeholder="What's this transfer for?"
          value={data.description}
          onChange={(e) =>
            setData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="min-h-25 placeholder:text-sm"
        />
        <FieldDescription className="text-xs">
          Add a note to help the recipient understand why you sent this money.
        </FieldDescription>
      </Field>

      <AccountSourceCard />
    </div>
  );
}
