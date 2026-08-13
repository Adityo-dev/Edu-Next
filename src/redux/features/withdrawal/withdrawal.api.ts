import { apiClient } from '@/redux/apiClient/apiClient';
import { ICommonResponse } from '@/types/courseManagement.types';
import { IPayoutSettings, IWithdrawalRequest } from '@/types/withdrawal.types';

export const withdrawalApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // INSTRUCTOR ENDPOINTS

    getPayoutSettings: builder.query<ICommonResponse<IPayoutSettings>, void>({
      query: () => ({
        url: '/auth/instructor/payout-settings',
        method: 'GET',
      }),
      providesTags: ['PayoutSettings'],
    }),

    updatePayoutSettings: builder.mutation<
      ICommonResponse<IPayoutSettings>,
      Partial<IPayoutSettings>
    >({
      query: (data) => ({
        url: '/auth/instructor/payout-settings',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PayoutSettings'],
    }),

    requestWithdrawal: builder.mutation<
      ICommonResponse<unknown>,
      { amount: number; method: 'bank' | 'bkash' | 'nagad' }
    >({
      query: (data) => ({
        url: '/withdrawal',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Withdrawals'],
    }),

    getMyWithdrawals: builder.query<ICommonResponse<IWithdrawalRequest[]>, void>({
      query: () => ({
        url: '/withdrawal/my-requests',
        method: 'GET',
      }),
      providesTags: ['Withdrawals'],
    }),

    // ADMIN ENDPOINTS

    getPendingWithdrawals: builder.query<ICommonResponse<IWithdrawalRequest[]>, void>({
      query: () => ({
        url: '/withdrawal?status=pending',
        method: 'GET',
      }),
      providesTags: ['Withdrawals'],
    }),

    processWithdrawal: builder.mutation<
      ICommonResponse<unknown>,
      {
        id: string;
        data: { action: 'approve' | 'reject'; adminTransactionId?: string; adminNote?: string };
      }
    >({
      query: ({ id, data }) => ({
        url: `/withdrawal/${id}/process`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Withdrawals'],
    }),
  }),
});

export const {
  useGetPayoutSettingsQuery,
  useUpdatePayoutSettingsMutation,
  useRequestWithdrawalMutation,
  useGetMyWithdrawalsQuery,
  useGetPendingWithdrawalsQuery,
  useProcessWithdrawalMutation,
} = withdrawalApi;
