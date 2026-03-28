import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, splitAccountNumber } from '@/lib/utils';
import { useLoanRepaymentWorkflowStore } from '@/store/loan-repayment-workflow-store';
import { Loan } from '@/types';

import { useLoanRepaymentFlow } from '../hooks/use-loan-repayment-flow';
import { convertToCapitalized } from '../utils';
import RepaymentSummaryCard from './repayment-summary-card';

export default function LoanRepaymentReviewStep({ loan }: { loan: Loan }) {
  const amount = useLoanRepaymentWorkflowStore((state) => state.amount);
  const paymentMethod = useLoanRepaymentWorkflowStore(
    (state) => state.paymentMethod,
  );
  const { selectedAccount } = useLoanRepaymentFlow(loan);
  const remainingBalance = Math.max(loan.outstandingBalance - amount, 0);

  if (!selectedAccount) return null;

  const items = [
    ['Loan number', loan.loanNumber],
    ['Funding account', splitAccountNumber(selectedAccount.accountNumber, 3, 4)],
    ['Payment method', convertToCapitalized(paymentMethod)],
    ['Outstanding now', formatCurrency(loan.outstandingBalance, 'NGN')],
    ['Remaining after payment', formatCurrency(remainingBalance, 'NGN')],
  ];

  return (
    <div className="flex flex-col gap-6">
      <RepaymentSummaryCard
        label="Amount to pay"
        amount={formatCurrency(amount, 'NGN')}
        metrics={[
          { label: 'Loan type', value: `${convertToCapitalized(loan.loanType)} loan` },
          { label: 'Monthly due', value: formatCurrency(loan.monthlyPayment, 'NGN') },
        ]}
      />
      <Card>
        <CardContent className="flex flex-col divide-y divide-border px-4 pt-0">
          {items.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 py-3">
              <span className="text-xs text-muted-foreground">{label}</span>
              <span className="text-sm font-medium text-foreground">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
