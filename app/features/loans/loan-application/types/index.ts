import { Account, Loan } from '@/types';

export type LoanApplicationPayload = {
  accountId: Account['id'];
  loanType: Loan['loanType'];
  principalAmount: number;
  termMonths: number;
  purpose: string;
};
