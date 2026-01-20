import { callApi } from '@/lib/api-utils';

type LoginDetailsType = {
  email: string;
  password: string;
};

const postLogin = async (loginDetail: LoginDetailsType) => {
  const { email, password } = loginDetail;

  let response;
  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: email,
        password: password,
      }).toString(),
    });
  } catch (error) {
    console.error(error);
  }

  if (!response?.ok) {
    throw new Error('An error occurred' + response?.statusText);
  }

  return response.json();
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
