const request = async (url: string, options?: RequestInit): Promise<any> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  return await response.json();
};

export const getQueryParams = (params: {
  [key: string]: string | undefined;
}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value);
    }
  });

  return searchParams.toString();
};

export default request;
