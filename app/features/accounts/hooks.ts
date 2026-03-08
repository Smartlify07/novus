import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Account, AccountBalanceResponse } from '@/types';
import {
  createAccount,
  deleteAccount,
  updateAccount,
  getAccountBalance,
  getUserAccounts,
} from './api';

type CreateAccountPayload = {
  accountType: 'SAVINGS' | 'CURRENT' | 'FIXED_DEPOSIT';
  initialDeposit?: number;
};

type UpdateAccountPayload = Partial<{
  accountType: 'SAVINGS' | 'CURRENT' | 'FIXED_DEPOSIT';
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
}>;

export const ACCOUNTS_QUERY_KEY = ['accounts'];
export const ACCOUNT_BALANCE_QUERY_KEY = ['account', 'balance'];

export function useAccounts() {
  return useQuery<Account[]>({
    queryKey: ACCOUNTS_QUERY_KEY,
    queryFn: getUserAccounts,
  });
}

export function useAccountBalance(accountId: number) {
  return useQuery<AccountBalanceResponse>({
    queryKey: [...ACCOUNT_BALANCE_QUERY_KEY, accountId],
    queryFn: () => getAccountBalance(accountId),
    enabled: !!accountId,
  });
}

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAccountPayload) => createAccount(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY });
    },
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ accountId, payload }: { accountId: number; payload: UpdateAccountPayload }) =>
      updateAccount(accountId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY });
    },
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountId: number) => deleteAccount(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY });
    },
  });
}
