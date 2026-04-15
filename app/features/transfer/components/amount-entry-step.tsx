import { useState } from "react";
import { useTransferWorkflowStore } from "@/store/transfer-workflow-store";
import { useCurrentAccount } from "@/app/features/accounts/hooks";
import RecipientBadge from "./recepient-badge";
import AmountInput from "./amount-input";
import AccountSourceCard from "./account-source-card";

export default function AmountEntryStep() {
  const data = useTransferWorkflowStore((s) => s.data);
  const setData = useTransferWorkflowStore((s) => s.setData);
  const { data: currentAccount } = useCurrentAccount();
  const sourceAccountBalance = currentAccount?.balance ?? 0;

  const username = data.recepient
    ? `${data.recepient.user.firstName} ${data.recepient.user.lastName}`
    : null;
  const accountNumber = data.destinationAccountNumber;

  const [isBalanceSufficient, setIsBalanceSufficient] = useState(true);
  return (
    <div className="lg:max-w-ful flex flex-col gap-10 self-center lg:w-full">
      <RecipientBadge recepientName={username} accountNumber={accountNumber} />

      <AmountInput
        onValueChange={(value) => {
          setIsBalanceSufficient(
            (value.floatValue ?? 0) <= sourceAccountBalance,
          );
          setData((prev) => ({
            ...prev,
            amount: value.floatValue as number,
          }));
        }}
        isBalanceSufficient={isBalanceSufficient}
        initialValue={data.amount}
      />

      <AccountSourceCard />
    </div>
  );
}
