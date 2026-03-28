'use client';

import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAccounts, useCurrentAccount } from '@/app/features/accounts/hooks';
import { useLoanRepaymentWorkflowStore } from '@/store/loan-repayment-workflow-store';
import { Loan } from '@/types';
import {
  LOAN_REPAYMENTS_QUERY_KEY,
  LOANS_QUERY_KEY,
  useSubmitLoanRepayment,
} from '../../hooks';
import {
  createPaymentReference,
  getAmountError,
} from '../utils';

export function useLoanRepaymentFlow(loan: Loan) {
  const queryClient = useQueryClient();
  const { data: accounts = [] } = useAccounts();
  const { data: currentAccount } = useCurrentAccount();
  const { mutateAsync: submitRepayment, isPending } = useSubmitLoanRepayment();
  const amount = useLoanRepaymentWorkflowStore((state) => state.amount);
  const paymentMethod = useLoanRepaymentWorkflowStore(
    (state) => state.paymentMethod,
  );
  const paymentReference = useLoanRepaymentWorkflowStore(
    (state) => state.paymentReference,
  );
  const completedAt = useLoanRepaymentWorkflowStore(
    (state) => state.completedAt,
  );
  const selectedAccountId = useLoanRepaymentWorkflowStore(
    (state) => state.selectedAccountId,
  );
  const setCompletion = useLoanRepaymentWorkflowStore(
    (state) => state.setCompletion,
  );

  const repaymentAccounts = accounts.length
    ? accounts
    : currentAccount
      ? [currentAccount]
      : [];
  const resolvedAccountId =
    selectedAccountId ?? currentAccount?.id ?? repaymentAccounts[0]?.id ?? null;
  const selectedAccount =
    repaymentAccounts.find((account) => account.id === resolvedAccountId) ??
    currentAccount ??
    null;
  const amountError = getAmountError({
    amount,
    outstandingBalance: loan.outstandingBalance,
    selectedAccount,
  });
  const quickAmounts = useMemo(() => {
    return [loan.monthlyPayment, Math.round(loan.outstandingBalance / 2), loan.outstandingBalance]
      .map((value, index) => ({
        amount: Math.min(value, loan.outstandingBalance),
        label: ['Monthly due', 'Half balance', 'Clear balance'][index],
      }))
      .filter(
        (item, index, items) =>
          item.amount > 0 &&
          items.findIndex((entry) => entry.amount === item.amount) === index,
      );
  }, [loan.monthlyPayment, loan.outstandingBalance]);

  const submit = async () => {
    if (!selectedAccount || amountError) return false;

    try {
      const response = await submitRepayment({
        loanId: loan.id,
        payload: {
          accountId: selectedAccount.id,
          amount,
          paymentMethod,
        },
      });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: LOANS_QUERY_KEY }),
        queryClient.invalidateQueries({ queryKey: LOAN_REPAYMENTS_QUERY_KEY }),
        queryClient.invalidateQueries({ queryKey: ['accounts'] }),
        queryClient.invalidateQueries({ queryKey: ['accounts', 'current'] }),
      ]);

      setCompletion(response.paymentRef || createPaymentReference());
      toast.success('Loan repayment submitted');
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to submit repayment';
      toast.error(message);
      return false;
    }
  };

  return {
    amount,
    amountError,
    completedAt,
    currentAccount,
    isPending,
    paymentMethod,
    paymentReference,
    quickAmounts,
    repaymentAccounts,
    selectedAccount,
    submit,
  };
}
