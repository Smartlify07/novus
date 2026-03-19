import { LoanApplicationPayload } from '@/app/features/loans/loan-application/types';
import { Nullable } from '@/lib/type-utils';
import { Loan, LoanType } from '@/types';
import { create } from 'zustand';

type LoanApplicationWorkflowStore = Nullable<LoanApplicationPayload> & {
  step: string | number;

  setLoanType: (loanType: LoanType) => void;
  setTermMonths: (months: number) => void;
  setStep: (step: LoanApplicationWorkflowStore['step']) => void;
  setPrincipalAmount: (principalAmount: number) => void;
};
export const useLoanApplicationWorkflowStore =
  create<LoanApplicationWorkflowStore>((set, get) => ({
    accountId: null,
    loanType: null,
    termMonths: 0,
    purpose: '',
    principalAmount: 0,
    step: 'type',
    setLoanType: (loanType) => set({ loanType }),
    setTermMonths: (months) => set({ termMonths: months }),
    setStep: (step) => set({ step }),
    setPrincipalAmount: (principalAmount) => set({ principalAmount }),
  }));
