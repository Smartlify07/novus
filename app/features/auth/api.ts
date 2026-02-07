import { callApi } from '@/lib/api-utils';
import { toast } from 'sonner';

type LoginDetailsType = {
  email: string;
  password: string;
};

const postLogin = async (loginDetail: LoginDetailsType) => {
  const { email, password } = loginDetail;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email, password }),
    });
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

const postSignUp = async (form: any) => {
  return callApi('POST', '/open', form, {}, true);
};

const postRecoveryEmail = async (form: Record<string, any>) => {
  return callApi('POST', '/password-recovery', form, {}, true);
};
const postVerifyEmailCode = async (form: Record<string, any>) => {
  return callApi('POST', '/verify-token', form, {}, true);
};
const postResetPassword = async (form: Record<string, any>) => {
  return callApi('POST', '/reset-password', form, {}, true);
};

export {
  postLogin,
  postRecoveryEmail,
  postSignUp,
  postVerifyEmailCode,
  postResetPassword,
};
