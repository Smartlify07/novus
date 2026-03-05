import { AccountWithUser } from '@/types';
import RecipientBadge from './recepient-badge';
import AmountInput from './amount-input';
import { useState } from 'react';
import AccountSourceCard from './account-source-card';

export default function AmountEntryStep({
  recipient,
  sourceAccountBalance,
  onChange,
}: {
  recipient: AccountWithUser | null;
  sourceAccountBalance: number;
  onChange: (value: number) => void;
}) {
  const username = `${recipient?.user.firstName} ${recipient?.user.lastName}`;
  const [isBalanceSufficient, setIsBalanceSufficient] = useState(true);
  return (
    <div className="flex flex-col gap-10">
      <RecipientBadge recepientName={username} />

      <AmountInput
        onValueChange={(value, source) => {
          console.log(value, source);
          if (value.floatValue) {
            setIsBalanceSufficient(!(value.floatValue > sourceAccountBalance));
            onChange(value.floatValue);
          }
        }}
        isBalanceSufficient={isBalanceSufficient}
      />
    </div>
  );
}
