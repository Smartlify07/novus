import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { TransferResponse } from "@/app/features/transactions/api";

export default function TransferSuccessStep({
  transferResult,
}: {
  transferResult: TransferResponse | null;
}) {
  const router = useRouter();
  const handleResetAndNavigate = async (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex w-full max-w-full flex-col gap-6 self-center lg:gap-10">
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
          <HugeiconsIcon
            icon={CheckmarkCircle01Icon}
            size={48}
            className="text-primary"
          />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-semibold">Transfer Successful</h1>
          <p className="text-muted-foreground">
            Your transfer has been processed successfully.
          </p>
        </div>
      </div>

      <Card className="bg-muted/50 rounded-md">
        <CardContent className="flex flex-col gap-4">
          <CardTitle className="text-lg font-medium">
            Transaction Details
          </CardTitle>

          <div className="flex flex-col rounded-lg border">
            <DetailBlock
              label="Amount Sent"
              value={
                transferResult
                  ? formatCurrency(transferResult.amount, "NGN")
                  : "-"
              }
            />
            <DetailBlock
              label="TX Ref."
              value={transferResult?.transactionRef ?? "-"}
            />
            <DetailBlock
              label="Status"
              value={transferResult?.status ?? "Completed"}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        <Button
          className="w-full"
          onClick={() => handleResetAndNavigate("/transactions")}
        >
          View Transaction
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleResetAndNavigate("/dashboard")}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b p-4 last:border-0">
      <h4 className="text-muted-foreground text-sm">{label}</h4>
      <p className="text-foreground truncate font-medium">{value} </p>
    </div>
  );
}
