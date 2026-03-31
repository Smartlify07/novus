import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import PendingLoansTable from './pending-loans-table';
import Link from 'next/link';

export default function PendingLoans() {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex items-center justify-between ">
        <CardTitle className="text-sm">Pending applications</CardTitle>
        <Button asChild variant={'outline'}>
          <Link href="/loans">
            View All <HugeiconsIcon icon={ArrowRight02Icon} />
          </Link>
        </Button>
      </CardHeader>

      <PendingLoansTable />
    </Card>
  );
}
