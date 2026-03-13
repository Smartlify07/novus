'use server';
import { callApi } from '@/lib/api-utils';
import { SignupFormValues } from '../signup-onboarding/schema';
import { useAuthStore } from '@/store/auth-store';
import { User } from '@/types';
import { cookies } from 'next/headers';

type LoginDetailsType = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    address?: string;
    roles: string[];
    isActive: boolean;
  };
  token: string;
  type: string;
  expiresIn: number;
};

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const postLogin = async (loginDetail: LoginDetailsType) => {
  const { email, password } = loginDetail;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      },
    );
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Incorrect email or password. Please try again.');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login Failed');
      }
    }
    const data: LoginResponse = await response.json();

    useAuthStore.getState().setAuth(data.user, data.token, data.expiresIn);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postSignUp = async (payload: SignupFormValues) => {
  return callApi('POST', '/auth/register', payload, {}, true);
};

const getUser = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: await getAuthHeaders(),
    });
    return (await response.json()) as User;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export { postLogin, postSignUp, getUser };
