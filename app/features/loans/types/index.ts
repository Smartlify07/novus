import { Account, Loan, Pagination } from '@/types';

export type LoanResponse = {
  loans: Loan[];
  pagination: Pagination;
};

export type LoanRepaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export type LoanRepayment = {
  id: number;
  paymentRef: string;
  amount: number;
  principalAmount: number;
  interestAmount: number;
  paymentDate: string;
  paymentMethod: 'DEBIT';
  status: LoanRepaymentStatus;
};

export type LoanRepaymentsResponse = {
  repayments: LoanRepayment[];
  totalRepaid: number;
  remainingBalance: number;
};

export type LoanRepaymentMethod = 'DEBIT' | 'TRANSFER' | 'CASH';

export type LoanRepaymentPayload = {
  accountId: Account['id'];
  amount: number;
  paymentMethod: LoanRepaymentMethod;
};

export type SubmitLoanRepaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export type SubmitLoanRepaymentResponse = {
  paymentRef: string;
  amount: number;
  remainingBalance: number;
  status: SubmitLoanRepaymentStatus;
  paymentDate: string;
};
