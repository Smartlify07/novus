import { callApi } from '@/lib/api-utils';
import { toast } from 'sonner';
import { SignupFormValues } from '../signup-onboarding/schema';

type LoginDetailsType = {
  email: string;
  password: string;
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
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postSignUp = async (payload: SignupFormValues) => {
  return callApi('POST', '/auth/register', payload, {}, true);
};

export { postLogin, postSignUp };
