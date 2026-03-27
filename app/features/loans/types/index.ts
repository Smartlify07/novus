import { Loan, Pagination } from '@/types';

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
