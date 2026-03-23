import { Loan, Pagination } from '@/types';

export type LoanResponse = {
  loans: Loan[];
  pagination: Pagination;
};
