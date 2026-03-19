import { LoanApplicationPayload } from '@/app/features/loans/loan-application/types';
import { Nullable } from '@/lib/type-utils';
import { Account, Loan, LoanType } from '@/types';
import { create } from 'zustand';

type LoanApplicationWorkflowStore = Nullable<LoanApplicationPayload> & {
  step: string | number;
  accountId: null | Account['id'];
  termMonths: number;
  purpose: string;
  principalAmount: number;
  setLoanType: (loanType: LoanType) => void;
  setTermMonths: (months: number) => void;
  setStep: (step: LoanApplicationWorkflowStore['step']) => void;
  setPrincipalAmount: (principalAmount: number) => void;
  setPurpose: (purpose: string) => void;
};
export const useLoanApplicationWorkflowStore =
  create<LoanApplicationWorkflowStore>((set, get) => ({
    accountId: null,
    loanType: null,
    termMonths: 12, // default value of 12
    purpose: '',
    principalAmount: 50000,
    step: 'type',
    setLoanType: (loanType) => set({ loanType }),
    setTermMonths: (months) => set({ termMonths: months }),
    setStep: (step) => set({ step }),
    setPrincipalAmount: (principalAmount) => set({ principalAmount }),
    setPurpose: (purpose) => set({ purpose }),
  }));
