import { callApi } from '@/lib/api-utils';
import { SignupFormValues } from '../signup-onboarding/schema';
import { useAuthStore } from '@/store/auth-store';

type LoginDetailsType = {
  email: string;
  password: string;
};

type LoginResponse = {
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

export { postLogin, postSignUp };
