import { Button } from '@/components/ui/button';
import { PlusSignIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export default function NewTransactionButton() {
  return (
    <Button>
      <HugeiconsIcon icon={PlusSignIcon} />
      New Transaction
    </Button>
  );
}
