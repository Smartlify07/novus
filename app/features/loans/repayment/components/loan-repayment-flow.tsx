'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import Stepper, {
  StepContent,
} from '@/app/features/loans/loan-application/components/stepper';
import { Button } from '@/components/ui/button';
import { useLoanRepaymentWorkflowStore } from '@/store/loan-repayment-workflow-store';
import { Loan } from '@/types';

import { useLoanRepaymentFlow } from '../hooks/use-loan-repayment-flow';
import { REPAYMENT_STEPS } from '../types';
import LoanRepaymentActions from './loan-repayment-actions';
import LoanRepaymentAmountStep from './loan-repayment-amount-step';
import LoanRepaymentHeader from './loan-repayment-header';
import LoanRepaymentMethodStep from './loan-repayment-method-step';
import LoanRepaymentReviewStep from './loan-repayment-review-step';
import LoanRepaymentStepper from './loan-repayment-stepper';
import LoanRepaymentSuccessStep from './loan-repayment-success-step';

type LoanRepaymentFlowProps = {
  loan: Loan;
};

export default function LoanRepaymentFlow({ loan }: LoanRepaymentFlowProps) {
  const initializeWorkflow = useLoanRepaymentWorkflowStore(
    (state) => state.initializeWorkflow,
  );
  const resetWorkflow = useLoanRepaymentWorkflowStore(
    (state) => state.resetWorkflow,
  );
  const { amountError, isPending, selectedAccount, submit } =
    useLoanRepaymentFlow(loan);

  useEffect(() => {
    initializeWorkflow({
      id: loan.id,
      monthlyPayment: loan.monthlyPayment,
      outstandingBalance: loan.outstandingBalance,
    });
  }, [
    initializeWorkflow,
    loan.id,
    loan.monthlyPayment,
    loan.outstandingBalance,
  ]);

  useEffect(() => {
    return () => resetWorkflow();
  }, [resetWorkflow]);

  return (
    <div className="px-6 py-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <LoanRepaymentHeader loan={loan} />
        <Stepper defaultValue={REPAYMENT_STEPS[0]} className="max-w-full">
          <div className="flex flex-col gap-8">
            <LoanRepaymentStepper />
            <StepContent stepId={1} value="amount">
              <LoanRepaymentAmountStep loan={loan} />
            </StepContent>
            <StepContent stepId={2} value="method">
              <LoanRepaymentMethodStep />
            </StepContent>
            <StepContent stepId={3} value="review">
              {selectedAccount ? (
                <LoanRepaymentReviewStep loan={loan} />
              ) : (
                <Button asChild variant="outline">
                  <Link href="/loans">Return to loans</Link>
                </Button>
              )}
            </StepContent>
            <StepContent stepId={4} value="success">
              <LoanRepaymentSuccessStep />
            </StepContent>
            <LoanRepaymentActions
              canContinue={!amountError && !!selectedAccount}
              isPending={isPending}
              onSubmit={submit}
            />
          </div>
        </Stepper>
      </div>
    </div>
  );
}
