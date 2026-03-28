import { create } from 'zustand';

import { LoanRepaymentMethod } from '@/app/features/loans/types';
import { getSuggestedAmount } from '@/app/features/loans/repayment/utils';
import { Loan } from '@/types';

type LoanRepaymentWorkflowState = {
  amount: number;
  completedAt: string;
  loanId: number | null;
  paymentMethod: LoanRepaymentMethod;
  paymentReference: string;
  selectedAccountId: number | null;
};

type LoanRepaymentWorkflowStore = LoanRepaymentWorkflowState & {
  initializeWorkflow: (
    loan: Pick<Loan, 'id' | 'monthlyPayment' | 'outstandingBalance'>,
  ) => void;
  resetWorkflow: () => void;
  setAmount: (amount: number) => void;
  setCompletion: (paymentReference?: string) => void;
  setPaymentMethod: (paymentMethod: LoanRepaymentMethod) => void;
  setSelectedAccountId: (accountId: number | null) => void;
};

const initialState: LoanRepaymentWorkflowState = {
  amount: 0,
  completedAt: '',
  loanId: null,
  paymentMethod: 'DEBIT',
  paymentReference: '',
  selectedAccountId: null,
};

export const useLoanRepaymentWorkflowStore =
  create<LoanRepaymentWorkflowStore>((set) => ({
    ...initialState,
    initializeWorkflow: (loan) =>
      set((state) => {
        if (state.loanId === loan.id) {
          return state;
        }

        return {
          ...initialState,
          amount: getSuggestedAmount(loan),
          loanId: loan.id,
        };
      }),
    resetWorkflow: () => set(initialState),
    setAmount: (amount) => set({ amount }),
    setCompletion: (paymentReference) =>
      set({
        completedAt: new Date().toISOString(),
        paymentReference: paymentReference ?? '',
      }),
    setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
    setSelectedAccountId: (selectedAccountId) => set({ selectedAccountId }),
  }));
