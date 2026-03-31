import { useMutation, useQuery } from '@tanstack/react-query';
import {
  LoanRepaymentPayload,
  LoanRepaymentsResponse,
  LoanResponse,
  PendingLoansResponse,
  SubmitLoanRepaymentResponse,
} from '../types';
import {
  getLoanRepayments,
  getLoans,
  getPendingLoanApplications,
  submitLoanRepayment,
} from '../api';

export const LOANS_QUERY_KEY = ['loans'];
export const PENDING_LOANS_QUERY_KEY = [...LOANS_QUERY_KEY, 'pending'];
export const LOAN_REPAYMENTS_QUERY_KEY = ['loan-repayments'];

export const loanRepaymentsKeys = {
  all: LOAN_REPAYMENTS_QUERY_KEY,
  byLoanId: (loanId: number) => [...LOAN_REPAYMENTS_QUERY_KEY, loanId] as const,
};

export function useLoans() {
  return useQuery<LoanResponse>({
    queryKey: LOANS_QUERY_KEY,
    queryFn: getLoans,
  });
}

export function usePendingLoans() {
  return useQuery<PendingLoansResponse>({
    queryKey: PENDING_LOANS_QUERY_KEY,
    queryFn: getPendingLoanApplications,
  });
}

export function useLoanRepayments(loanId: number) {
  return useQuery<LoanRepaymentsResponse>({
    queryKey: loanRepaymentsKeys.byLoanId(loanId),
    queryFn: () => getLoanRepayments(loanId),
    enabled: !!loanId,
  });
}

export function useSubmitLoanRepayment() {
  return useMutation<
    SubmitLoanRepaymentResponse,
    Error,
    {
      loanId: number;
      payload: LoanRepaymentPayload;
    }
  >({
    mutationFn: ({ loanId, payload }) => submitLoanRepayment(loanId, payload),
  });
}
