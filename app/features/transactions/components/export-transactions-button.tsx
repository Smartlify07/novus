'use client';
import { Button } from '@/components/ui/button';
import { Download01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export default function ExportTransactionsButton() {
  return (
    <Button variant={'outline'}>
      <HugeiconsIcon icon={Download01Icon} size={16} />
      Export Report
    </Button>
  );
}
