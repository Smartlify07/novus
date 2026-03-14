'use server';

import { Account, AccountBalanceResponse } from '@/types';
import { cookies } from 'next/headers';

type CreateAccountPayload = {
  accountType: 'SAVINGS' | 'CURRENT' | 'FIXED_DEPOSIT';
  initialDeposit?: number;
};

type UpdateAccountPayload = Partial<{
  accountType: 'SAVINGS' | 'CURRENT' | 'FIXED_DEPOSIT';
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
}>;

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
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
        headers: await getAuthHeaders(),
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
        headers: await getAuthHeaders(),
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

const updateAccount = async (
  accountId: number,
  payload: UpdateAccountPayload,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts/${accountId}`,
      {
        method: 'PUT',
        headers: await getAuthHeaders(),
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

const setCurrentAccount = async (accountId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts/current`,
      {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify({
          accountId: accountId,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to set current account');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAccountBalance = async (
  accountId: number,
): Promise<AccountBalanceResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts/${accountId}/balance`,
      {
        method: 'GET',
        headers: await getAuthHeaders(),
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
        headers: await getAuthHeaders(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get user accounts');
    }

    const data: { accounts: Account[] } = await response.json();
    return data.accounts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCurrentAccount = async (): Promise<Account> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts/current`,
      {
        method: 'GET',
        headers: await getAuthHeaders(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get user accounts');
    }

    const data = await response.json();
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
  getCurrentAccount,
  setCurrentAccount,
};
