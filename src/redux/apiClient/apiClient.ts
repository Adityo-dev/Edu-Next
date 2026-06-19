import { getValidToken } from '@/services/root/handleToken';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

if (!process.env.NEXT_PUBLIC_BASE_API) {
  console.warn('WARNING: NEXT_PUBLIC_BASE_API is not set, using fallback URL');
}

const baseQuery = fetchBaseQuery({
  baseUrl: baseApi,

  // credentials: "include",
  prepareHeaders: async (headers) => {
    const token = await getValidToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiClient = createApi({
  reducerPath: 'apiClient',
  baseQuery: baseQuery,
  endpoints: () => ({}),

  tagTypes: ['user'],
});
