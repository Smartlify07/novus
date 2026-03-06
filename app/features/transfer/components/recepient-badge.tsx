import { Badge } from '@/components/ui/badge';
import { User } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React from 'react';

export default function RecipientBadge({
  recepientName,
}: {
  recepientName: string;
}) {
  return (
    <Badge
      variant={'secondary'}
      className="flex items-center gap-2 self-center bg-secondary h-6 [&>svg]:size-4!"
    >
      <HugeiconsIcon icon={User} size={40} />

      <span className="text-muted-foreground">
        Transferring to{' '}
        <span className="text-foreground font-semibold">{recepientName}</span>
      </span>
    </Badge>
  );
}
