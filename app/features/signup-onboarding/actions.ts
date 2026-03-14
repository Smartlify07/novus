'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createAccountSchema, CreateAccountFormValues } from './schema';
import { setCurrentAccount } from '../accounts/api';
import { Account } from '@/types';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const createAccountAction = async (
  initialState: {
    message: string | null;
    errors: Record<string, string> | null;
  },
  formData: FormData,
) => {
  const data = Object.fromEntries(
    formData,
  ) as unknown as CreateAccountFormValues;

  const parsed = createAccountSchema.safeParse({
    ...data,
    initialDeposit: Number(data.initialDeposit),
  });
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors as Record<string, string>,
      message: null,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts`,
      {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify({
          ...parsed.data,
          initialDeposit: Number(parsed.data.initialDeposit),
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: null,
        message: errorData.message || 'Failed to create account',
      };
    }
    const data: Account = await response.json();
    setCurrentAccount(data.id);
  } catch (error) {
    return {
      errors: null,
      message: 'An unexpected error occurred',
    };
  }
  return redirect('/dashboard');
};
