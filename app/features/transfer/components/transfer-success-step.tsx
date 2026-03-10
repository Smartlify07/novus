import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export default function TransferSuccessStep() {
  return (
    <div className="flex flex-col gap-10 w-xl max-w-xl self-center">
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <HugeiconsIcon
            icon={CheckmarkCircle01Icon}
            size={48}
            className="text-green-600"
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
        <CardContent className="flex flex-col gap-4 p-6">
          <CardTitle className="text-lg font-medium">Transaction Details</CardTitle>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">Amount Sent</p>
              <p className="text-foreground font-semibold">₦50,000.00</p>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">Transaction ID</p>
              <p className="text-foreground font-medium">TXN123456789</p>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">Status</p>
              <p className="text-green-600 font-medium">Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        <Button className="w-full" asChild>
          <Link href="/transactions">View Transaction</Link>
        </Button>
        
        <Button variant="outline" className="w-full" asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
