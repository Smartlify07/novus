import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Loan } from '@/types';

export function LoanBreakdown({ loan }: { loan: Loan }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase text-sm">Loan breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap">
          <BreakdownItem
            label="Principal"
            value={formatCurrency(loan.principalAmount, 'NGN')}
          />
          <BreakdownItem
            label="Total Interest (est.)"
            value={formatCurrency(10000, 'NGN')}
          />
          <BreakdownItem
            label="Total Repayable (est.)"
            value={formatCurrency(260000, 'NGN')}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function BreakdownItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b py-2 last:border-b-0 last:[&>p]:text-chart-5">
      <h4 className="text-sm text-muted-foreground">{label}</h4>
      <p className="text-foreground font-medium text-sm">{value}</p>
    </div>
  );
}
