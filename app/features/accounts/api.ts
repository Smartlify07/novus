import { Account, AccountBalanceResponse } from '@/types';
import { useAuthStore } from '@/store/auth-store';

type CreateAccountPayload = {
  accountType: 'SAVINGS' | 'CURRENT' | 'FIXED_DEPOSIT';
  initialDeposit?: number;
};

type UpdateAccountPayload = Partial<{
  accountType: 'SAVINGS' | 'CURRENT' | 'FIXED_DEPOSIT';
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
}>;

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const createAccount = async (payload: CreateAccountPayload) => {
  const { accountType, initialDeposit = 0 } = payload;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ accountType, initialDeposit }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create account');
    }

    const data: Account = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteAccount = async (accountId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts/${accountId}`,
      {
        method: 'DELETE',
        headers: getAuthHeaders(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete account');
    }

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateAccount = async (accountId: number, payload: UpdateAccountPayload) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts/${accountId}`,
      {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update account');
    }

    const data: Account = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAccountBalance = async (accountId: number): Promise<AccountBalanceResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts/${accountId}/balance`,
      {
        method: 'GET',
        headers: getAuthHeaders(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get account balance');
    }

    const data: AccountBalanceResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserAccounts = async (): Promise<Account[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts`,
      {
        method: 'GET',
        headers: getAuthHeaders(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get user accounts');
    }

    const data: Account[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  createAccount,
  deleteAccount,
  updateAccount,
  getAccountBalance,
  getUserAccounts,
};
