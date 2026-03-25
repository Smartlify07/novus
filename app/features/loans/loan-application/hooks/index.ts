import { useMutation, useQuery } from '@tanstack/react-query';
import { LoanApplicationPayload } from '../types';
import { getLoanRepayments, submitLoanApplication } from '../api';

type UseSubmitLoanApplicationOptions = {
  onSuccess?: () => void;
};

export function useSubmitLoanApplication(
  options?: UseSubmitLoanApplicationOptions,
) {
  return useMutation({
    mutationFn: (payload: LoanApplicationPayload) =>
      submitLoanApplication(payload),
    onSuccess: () => {
      options?.onSuccess?.();
    },
  });
}

export const loanRepaymentsKeys = {
  all: ['loan-repayments'] as const,
  byLoanId: (loanId: number) => ['loan-repayments', loanId] as const,
};

type UseLoanRepaymentsOptions = {
  loanId: number;
};

export function useLoanRepayments({ loanId }: UseLoanRepaymentsOptions) {
  return useQuery({
    queryKey: loanRepaymentsKeys.byLoanId(loanId),
    queryFn: () => getLoanRepayments(loanId),
    enabled: !!loanId,
  });
}
