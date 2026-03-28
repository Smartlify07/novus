import { Card } from '@/components/ui/card';
import { FieldDescription, FieldLabel } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLoanRepaymentWorkflowStore } from '@/store/loan-repayment-workflow-store';
import { LoanRepaymentMethod } from '../../types';
import { convertToCapitalized } from '../utils';

const paymentMethods: Array<{
  value: LoanRepaymentMethod;
  description: string;
}> = [
  { value: 'DEBIT', description: 'Charge the selected repayment account.' },
  { value: 'TRANSFER', description: 'Record repayment as a manual transfer.' },
  { value: 'CASH', description: 'Capture an in-branch cash repayment.' },
];

export default function LoanRepaymentMethodStep() {
  const paymentMethod = useLoanRepaymentWorkflowStore(
    (state) => state.paymentMethod,
  );
  const setPaymentMethod = useLoanRepaymentWorkflowStore(
    (state) => state.setPaymentMethod,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <FieldLabel className="p-0 text-base font-medium">
          Payment method
        </FieldLabel>
        <FieldDescription>
          Choose how this repayment should be processed.
        </FieldDescription>
      </div>
      <RadioGroup
        value={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value as LoanRepaymentMethod)}
        className="gap-3"
      >
        {paymentMethods.map((method) => (
          <label key={method.value} htmlFor={method.value} className="cursor-pointer">
            <Card className="flex-row items-start gap-3 px-4 py-4">
              <RadioGroupItem value={method.value} id={method.value} className="mt-1" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-foreground">
                  {convertToCapitalized(method.value)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {method.description}
                </span>
              </div>
            </Card>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
