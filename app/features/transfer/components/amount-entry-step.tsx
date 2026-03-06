import { useState } from 'react';
import { useTransferWorkflowStore } from '@/store/transfer-workflow-store';
import { currentUserAccounts } from '@/app/features/dashboard/data/dummyTxs';
import RecipientBadge from './recepient-badge';
import AmountInput from './amount-input';

export default function AmountEntryStep() {
  const data = useTransferWorkflowStore((s) => s.data);
  const setData = useTransferWorkflowStore((s) => s.setData);
  
  const sourceAccountId = data.sourceAccountId;
  const sourceAccountBalance = currentUserAccounts.find(
    (account) => account.id === sourceAccountId
  )?.balance ?? 0;

  const username = `${data.recepient?.user.firstName} ${data.recepient?.user.lastName}`;
  const [isBalanceSufficient, setIsBalanceSufficient] = useState(true);

  return (
    <div className="flex flex-col gap-10">
      <RecipientBadge recepientName={username} />

      <AmountInput
        onValueChange={(value) => {
          if (value.floatValue) {
            setIsBalanceSufficient(!(value.floatValue > sourceAccountBalance));
            setData((prev) => ({ ...prev, amount: value.floatValue as number }));
          }
        }}
        isBalanceSufficient={isBalanceSufficient}
      />
    </div>
  );
}
