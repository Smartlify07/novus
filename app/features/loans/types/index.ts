import { Account, Loan, Pagination } from '@/types';

export type LoanResponse = {
  loans: Loan[];
  pagination: Pagination;
};

export type PendingLoansResponse = {
  content: Loan[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  empty: boolean;
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

export type LoanApprovalPayload = {
  comments?: string;
  interestRate: number;
};

export type SubmitLoanRepaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export type SubmitLoanRepaymentResponse = {
  paymentRef: string;
  amount: number;
  remainingBalance: number;
  status: SubmitLoanRepaymentStatus;
  paymentDate: string;
};
