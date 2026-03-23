import { useQuery } from '@tanstack/react-query';
import { LoanResponse } from '../types';
import { getLoans } from '../api';

export const LOANS_QUERY_KEY = ['loans'];

export function useLoans() {
  return useQuery<LoanResponse>({
    queryKey: LOANS_QUERY_KEY,
    queryFn: getLoans,
  });
}
