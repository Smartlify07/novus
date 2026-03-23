'use server';

import { cookies } from 'next/headers';
import { LoanResponse } from '../types';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const getLoans = async (): Promise<LoanResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/loans`,
      {
        method: 'GET',
        headers: await getAuthHeaders(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch loans');
    }

    const data: LoanResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
