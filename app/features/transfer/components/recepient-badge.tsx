import { Badge } from '@/components/ui/badge';
import { User } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React from 'react';
import { maskAccountNumber } from '@/lib/utils';

export default function RecipientBadge({
  recepientName,
  accountNumber,
}: {
  recepientName?: string | null;
  accountNumber?: string;
}) {
  const displayName = recepientName || (accountNumber ? maskAccountNumber(accountNumber) : 'Unknown');

  return (
    <Badge
      variant={'secondary'}
      className="flex items-center gap-2 self-center bg-secondary h-6 [&>svg]:size-4!"
    >
      <HugeiconsIcon icon={User} size={40} />

      <span className="text-muted-foreground">
        Transferring to{' '}
        <span className="text-foreground font-semibold">{displayName}</span>
      </span>
    </Badge>
  );
}
