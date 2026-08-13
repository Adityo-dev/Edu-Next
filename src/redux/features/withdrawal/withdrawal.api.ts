import { apiClient } from '@/redux/apiClient/apiClient';
import { TMeta } from '@/types/apiResponse.types';
import { ICommonResponse } from '@/types/courseManagement.types';
import { IPayoutSettings, IWithdrawalRequest, IWithdrawalStats } from '@/types/withdrawal.types';

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

    getMyWithdrawals: builder.query<
      ICommonResponse<{ withdrawals: IWithdrawalRequest[]; pagination: TMeta }>,
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: '/withdrawal/my-requests',
        method: 'GET',
        params: params || {},
      }),
      providesTags: ['Withdrawals'],
    }),

    // ADMIN ENDPOINTS

    getPendingWithdrawals: builder.query<
      ICommonResponse<{
        stats: IWithdrawalStats;
        withdrawals: IWithdrawalRequest[];
        pagination: TMeta;
      }>,
      { page?: number; limit?: number; status?: string } | void
    >({
      query: (params) => ({
        url: '/withdrawal',
        method: 'GET',
        params: params || { status: 'pending' },
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
