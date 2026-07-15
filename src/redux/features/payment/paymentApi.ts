/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/redux/apiClient/apiClient';
import { TResponseRedux } from '@/types/apiResponse.types';
import {
  TInitiatePaymentResponse,
  TInstructorEarnings,
  TPaymentItem,
  TProcessRefundRequest,
  TRefundRequest,
  TAdminRevenueOverview,
  TInstructorWeeklyRevenue,
} from '@/types/payment.types';

export const paymentApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // POST /payment/initiate/{courseId}
    initiatePayment: builder.mutation<TResponseRedux<TInitiatePaymentResponse>, string>({
      query: (courseId) => ({
        url: `/payment/initiate/${courseId}`,
        method: 'POST',
      }),
    }),

    // GET /payment/my-payments
    getMyPayments: builder.query<TResponseRedux<TPaymentItem[]>, void>({
      query: () => ({
        url: '/payment/my-payments',
        method: 'GET',
      }),
      providesTags: ['Payment'],
    }),

    // POST /payment/refund/{paymentId}
    refundPayment: builder.mutation<
      TResponseRedux<any>,
      { paymentId: string; data: TRefundRequest }
    >({
      query: ({ paymentId, data }) => ({
        url: `/payment/refund/${paymentId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Payment'],
    }),

    // GET /payment/refund-requests
    getRefundRequests: builder.query<TResponseRedux<TPaymentItem[]>, void>({
      query: () => ({
        url: '/payment/refund-requests',
        method: 'GET',
      }),
      providesTags: ['Payment'],
    }),

    // PUT /payment/refund/{paymentId}/process
    processRefund: builder.mutation<
      TResponseRedux<any>,
      { paymentId: string; data: TProcessRefundRequest }
    >({
      query: ({ paymentId, data }) => ({
        url: `/payment/refund/${paymentId}/process`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Payment'],
    }),

    // GET /payment/instructor/earnings
    getInstructorEarnings: builder.query<
      TResponseRedux<TInstructorEarnings>,
      { page?: number; limit?: number; courseId?: string; status?: string } | void
    >({
      query: (params) => ({
        url: '/payment/instructor/earnings',
        method: 'GET',
        params: params || {},
      }),
    }),

    // GET /payment/admin/revenue-overview
    getAdminRevenueOverview: builder.query<TResponseRedux<TAdminRevenueOverview>, void>({
      query: () => ({
        url: '/payment/admin/revenue-overview',
        method: 'GET',
      }),
      providesTags: ['Payment'],
    }),

    // GET /payment/instructor/weekly-revenue
    getInstructorWeeklyRevenue: builder.query<TResponseRedux<TInstructorWeeklyRevenue>, void>({
      query: () => ({
        url: '/payment/instructor/weekly-revenue',
        method: 'GET',
      }),
      providesTags: ['Payment'],
    }),
  }),
});

export const {
  useInitiatePaymentMutation,
  useGetMyPaymentsQuery,
  useRefundPaymentMutation,
  useGetRefundRequestsQuery,
  useProcessRefundMutation,
  useGetInstructorEarningsQuery,
  useGetAdminRevenueOverviewQuery,
  useGetInstructorWeeklyRevenueQuery,
} = paymentApi;
