import { useMutation } from '@tanstack/react-query';
import { LoanApplicationPayload } from '../types';
import { submitLoanApplication } from '../api';

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
