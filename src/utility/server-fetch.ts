import { getCookies } from "@/services/auth/tokenHandler";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const serverFetchHelper = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookies("accessToken");
  const response = await fetch(`${BACKEND_API_URL}${url}`, {
    headers: {
      ...headers,
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
    },
    ...restOptions,
  });

  return response;
};

export const serverFetch = {
  get: async (url: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(url, { ...options, method: "GET" }),
  post: async (url: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(url, { ...options, method: "POST" }),
  patch: async (url: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(url, { ...options, method: "PATCH" }),
  delete: async (url: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(url, { ...options, method: "DELETE" }),
  put: async (url: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(url, { ...options, method: "PUT" }),
};
