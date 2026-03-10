import { Transaction, Pagination } from '@/types';
import { useAuthStore } from '@/store/auth-store';

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

type GetTransactionsParams = {
  accountId?: number;
  startDate?: string;
  endDate?: string;
};

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const getTransactions = async (params: GetTransactionsParams): Promise<TransactionResponse> => {
  const { accountId, startDate, endDate } = params;

  const searchParams = new URLSearchParams();
  if (accountId) searchParams.append('accountId', accountId.toString());
  if (startDate) searchParams.append('startDate', startDate);
  if (endDate) searchParams.append('endDate', endDate);

  const queryString = searchParams.toString();
  const endpoint = queryString ? `/transactions?${queryString}` : '/transactions';

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        method: 'GET',
        headers: getAuthHeaders(),
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

const transferMoney = async (payload: TransferPayload): Promise<Transaction> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions/transfer`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to transfer money');
    }

    const data: Transaction = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(error);
    throw error;
  }
};

export { getTransactions, transferMoney };
