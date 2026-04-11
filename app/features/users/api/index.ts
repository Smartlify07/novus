'use server';

import { cookies } from 'next/headers';
import { PaginatedUserResponse } from '../types';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const getUsers = async (): Promise<PaginatedUserResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
      {
        method: 'GET',
        headers: await getAuthHeaders(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch users');
    }

    const data: PaginatedUserResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
