import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

export default function LoanAmountDisplay({
  principalAmount,
}: {
  principalAmount: number;
}) {
  return (
    <Card className="bg-primary/5 px-6 py-10 gap-1 items-center">
      <CardTitle className="text-5xl tracking-tighter">
        {formatCurrency(principalAmount ?? 0, 'NGN')}
      </CardTitle>
      <CardDescription className="tracking-tight">
        Principal Amount
      </CardDescription>
    </Card>
  );
}
