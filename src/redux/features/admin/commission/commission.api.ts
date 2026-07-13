import { apiClient } from '@/redux/apiClient/apiClient';
import {
  TGetCommissionResponse,
  TGetCurrentCommissionResponse,
  TUpdateCommissionResponse,
} from '@/types/commission.types';

export const commissionApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // GET /commission
    getCommission: builder.query<TGetCommissionResponse, void>({
      query: () => ({
        url: '/commission',
        method: 'GET',
      }),
      providesTags: ['Commission'],
    }),

    // GET /commission/current
    getCurrentCommission: builder.query<TGetCurrentCommissionResponse, void>({
      query: () => ({
        url: '/commission/current',
        method: 'GET',
      }),
      providesTags: ['Commission'],
    }),

    // PUT /commission
    updateCommission: builder.mutation<TUpdateCommissionResponse, { newRate: number }>({
      query: (body) => ({
        url: '/commission',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Commission'],
    }),
  }),
});

export const { useGetCommissionQuery, useGetCurrentCommissionQuery, useUpdateCommissionMutation } =
  commissionApi;
