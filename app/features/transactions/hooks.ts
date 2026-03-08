import { useQuery } from '@tanstack/react-query';
import { TransactionResponse } from '@/types';
import { getTransactions } from './api';

type GetTransactionsParams = {
  accountId?: number;
  startDate?: string;
  endDate?: string;
};

export const TRANSACTIONS_QUERY_KEY = ['transactions'];

export function useTransactions(params: GetTransactionsParams = {}) {
  return useQuery<TransactionResponse>({
    queryKey: [...TRANSACTIONS_QUERY_KEY, params],
    queryFn: () => getTransactions(params),
  });
}
