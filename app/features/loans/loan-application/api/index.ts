'use server';

import { cookies } from 'next/headers';
import { LoanApplicationPayload } from '../types';
import { LoanRepaymentsResponse } from '../../types';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const submitLoanApplication = async (
  payload: LoanApplicationPayload,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/loans/apply`,
      {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      if (errorData.fieldErrors) {
        const errors = Object.entries(errorData.fieldErrors);
        const errorString = errors.map(([key, value]) => `${value}`).join('');
        throw new Error(errorString);
      } else {
        throw new Error(
          errorData.message || 'Failed to submit loan application',
        );
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLoanRepayments = async (loanId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/loans/${loanId}/repayments`,
      {
        method: 'GET',
        headers: await getAuthHeaders(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch loan repayments');
    }

    const data = await response.json();
    return data as LoanRepaymentsResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
