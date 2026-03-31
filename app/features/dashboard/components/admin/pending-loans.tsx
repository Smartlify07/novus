import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight01Icon, ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import PendingLoansTable from './pending-loans-table';

export default function PendingLoans() {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex items-center justify-between ">
        <CardTitle>Pending applications</CardTitle>
        <Button variant={'link'}>
          View All <HugeiconsIcon icon={ArrowRight02Icon} />
        </Button>
      </CardHeader>

      <PendingLoansTable />
    </Card>
  );
}
