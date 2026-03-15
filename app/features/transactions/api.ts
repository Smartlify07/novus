'use server';
import { Transaction, Pagination } from '@/types';
import { useAuthStore } from '@/store/auth-store';
import { cookies } from 'next/headers';

export type TransactionResponse = {
  transactions: Transaction[];
  pagination: Pagination;
};

export type TransferPayload = {
  sourceAccountId: number;
  destinationAccountNumber: string;
  amount: number;
  description: string;
};

export type TransferResponse = {
  transactionRef: string;
  accountId: number;
  transactionType: string;
  amount: number;
  newBalance: number;
  status: string;
  timestamp: string;
};

type GetTransactionsParams = {
  accountId?: number;
  startDate?: string;
  endDate?: string;
};

const getAuthHeaders = async () => {
  const token = (await cookies()).get('token')?.value;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const getTransactions = async (
  params: GetTransactionsParams,
): Promise<TransactionResponse> => {
  const { accountId, startDate, endDate } = params;

  const searchParams = new URLSearchParams();
  if (accountId) searchParams.append('accountId', accountId.toString());
  if (startDate) searchParams.append('startDate', startDate);
  if (endDate) searchParams.append('endDate', endDate);

  const queryString = searchParams.toString();
  const endpoint = queryString
    ? `/transactions?${queryString}`
    : '/transactions';

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        method: 'GET',
        headers: await getAuthHeaders(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get transactions');
    }

    const data: TransactionResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const transferMoney = async (
  payload: TransferPayload,
): Promise<TransferResponse> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions/transfer`,
      {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify(payload),
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to transfer money');
    }

    const data: TransferResponse = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(error);
    throw error;
  }
};

export { getTransactions, transferMoney };
