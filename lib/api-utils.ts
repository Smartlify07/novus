type HttpMethod = NonNullable<RequestInit['method']>;

// In Production
export const callApi = async (
  method: HttpMethod,
  endpoint: string,
  data: any | null = null,
  options: Record<string, any> = {},
  noAuth = false,
  includeCookies: boolean = false,
) => {
  if (!['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
    throw new Error('Invalid method specified');
  }

  let response;
  try {
    const accountData = JSON.parse(localStorage.getItem('account') ?? '{}'); // TODO: get account data from where we store it

    if (
      !noAuth &&
      (!accountData || new Date() > new Date(accountData.expires))
    ) {
      localStorage.clear();
      window.location.replace(
        `/login?token_expired=${encodeURIComponent(true)}`,
      );
      return;
    }

    const authorization = noAuth
      ? {}
      : { Authorization: `Bearer ${accountData?.access_token}` };
    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      ...options,
      method,
      headers: {
        ...options?.headers,
        ...authorization,
        'Content-Type': 'application/json',
      },
      body:
        ['POST', 'PUT'].includes(method) && data !== null
          ? JSON.stringify(data)
          : undefined,
      credentials: includeCookies ? 'include' : 'same-origin',
    });
  } catch (error) {
    console.error(error);
  }

  if (!response?.ok) {
    throw Error('An error occurred' + response?.statusText);
  }

  return response.json();
};

export const callFormApi = async (
  method: HttpMethod,
  endpoint: string,
  formData: FormData | null,
  options: Record<string, any> = {},
  noAuth = false,
) => {
  let response;
  try {
    const accountData = JSON.parse(localStorage.getItem('account') ?? '{}');
    const authorization = noAuth
      ? {}
      : { Authorization: `Bearer ${accountData?.access_token}` };

    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      method,
      headers: {
        ...options?.headers,
        ...authorization,
      },
      body: formData,
    });
  } catch (error) {
    console.error(error);
  }

  if (!response?.ok) {
    throw new Error(response?.statusText + 'An error occurred');
  }

  return response.json();
};

export const createData = async (
  endpoint: string,
  data: any,
  options: Record<string, any> = {},
) => {
  return callApi('POST', endpoint, data, options);
};

export const deleteData = async (
  endpoint: string,
  id: string,
  options: Record<string, any> = {},
) => {
  return callApi('DELETE', `${endpoint}/${id}`, null, options);
};

export const updateData = async (
  endpoint: string,
  id: string | number,
  data: Record<string, any>,
  options: Record<string, any> = {},
) => {
  return callApi('PUT', `${endpoint}/${id}`, data, options);
};

export const fetchData = async (
  endpoint: string,
  options: Record<string, any> = {},
) => {
  return callApi('GET', endpoint, null, options);
};
