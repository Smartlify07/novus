import { format } from 'date-fns';
import { Checkmark } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { useLoanRepaymentWorkflowStore } from '@/store/loan-repayment-workflow-store';

import { convertToCapitalized } from '../utils';
import RepaymentSummaryCard from './repayment-summary-card';

export default function LoanRepaymentSuccessStep() {
  const amount = useLoanRepaymentWorkflowStore((state) => state.amount);
  const completedAt = useLoanRepaymentWorkflowStore(
    (state) => state.completedAt,
  );
  const paymentMethod = useLoanRepaymentWorkflowStore(
    (state) => state.paymentMethod,
  );
  const paymentReference = useLoanRepaymentWorkflowStore(
    (state) => state.paymentReference,
  );

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-primary/10 bg-primary/5">
        <CardHeader className="items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <HugeiconsIcon icon={Checkmark} size={24} />
          </div>
          <CardTitle className="text-2xl tracking-tight">Repayment submitted</CardTitle>
          <CardDescription>Your repayment has been sent for processing.</CardDescription>
        </CardHeader>
      </Card>
      <RepaymentSummaryCard
        label="Payment summary"
        amount={formatCurrency(amount, 'NGN')}
        metrics={[
          { label: 'Method', value: convertToCapitalized(paymentMethod) },
          { label: 'Reference', value: paymentReference },
          { label: 'Submitted', value: format(new Date(completedAt), 'PPP p') },
        ]}
      />
      <Card>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">
            We refreshed your loan and repayment queries so the loans page picks up the latest state.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
