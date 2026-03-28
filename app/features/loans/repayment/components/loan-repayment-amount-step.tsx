import { NumericFormat } from 'react-number-format';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { useLoanRepaymentWorkflowStore } from '@/store/loan-repayment-workflow-store';
import { Loan } from '@/types';

import { useLoanRepaymentFlow } from '../hooks/use-loan-repayment-flow';
import RepaymentAccountList from './repayment-account-list';
import RepaymentMetric from './repayment-metric';
import RepaymentSummaryCard from './repayment-summary-card';

export default function LoanRepaymentAmountStep({ loan }: { loan: Loan }) {
  const amount = useLoanRepaymentWorkflowStore((state) => state.amount);
  const setAmount = useLoanRepaymentWorkflowStore((state) => state.setAmount);
  const setSelectedAccountId = useLoanRepaymentWorkflowStore(
    (state) => state.setSelectedAccountId,
  );
  const { amountError, quickAmounts, repaymentAccounts, selectedAccount } =
    useLoanRepaymentFlow(loan);
  const remainingBalance = Math.max(loan.outstandingBalance - amount, 0);
  const sourceBalance = Math.max((selectedAccount?.balance ?? 0) - amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <RepaymentSummaryCard
        label="Outstanding balance"
        amount={formatCurrency(loan.outstandingBalance, 'NGN')}
        metrics={[
          { label: 'Monthly due', value: formatCurrency(loan.monthlyPayment, 'NGN') },
          { label: 'Loan number', value: loan.loanNumber },
        ]}
      />
      <RepaymentAccountList
        accounts={repaymentAccounts}
        selectedAccountId={selectedAccount?.id}
        onSelect={setSelectedAccountId}
      />
      <Field className="gap-3">
        <FieldLabel className="p-0 text-sm font-medium">Repayment amount</FieldLabel>
        <NumericFormat
          value={amount}
          allowNegative={false}
          thousandSeparator=","
          decimalScale={2}
          fixedDecimalScale
          customInput={Input}
          prefix="NGN "
          placeholder="NGN 0.00"
          className="h-13 text-2xl font-semibold tracking-tight"
          onValueChange={(values) => setAmount(values.floatValue ?? 0)}
        />
        <div className="flex flex-wrap gap-2">
          {quickAmounts.map((quickAmount) => (
            <Button
              key={quickAmount.label}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAmount(quickAmount.amount)}
            >
              {quickAmount.label}
            </Button>
          ))}
        </div>
        <FieldDescription>Choose how much you want to pay today.</FieldDescription>
        {amountError && <FieldError>{amountError}</FieldError>}
      </Field>
      <Card size="sm" className="bg-muted/40">
        <CardContent className="grid grid-cols-2 gap-3 pt-1">
          <RepaymentMetric label="After this payment" value={formatCurrency(remainingBalance, 'NGN')} />
          <RepaymentMetric
            label="Source balance"
            value={formatCurrency(sourceBalance, selectedAccount?.currency ?? 'NGN')}
          />
        </CardContent>
      </Card>
    </div>
  );
}
