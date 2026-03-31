'use server';

import { cookies } from 'next/headers';
import { DashboardStats } from '../types';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard/stats`,
      {
        headers: await getAuthHeaders(),
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || 'Failed to fetch dashboard statistics',
      );
    }
    const data: DashboardStats = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
