/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/redux/apiClient/apiClient';
import { TResponseRedux } from '@/types/apiResponse.types';
import {
  TInitiatePaymentResponse,
  TInstructorEarnings,
  TPaymentItem,
  TProcessRefundRequest,
  TRefundRequest,
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
    getInstructorEarnings: builder.query<TResponseRedux<TInstructorEarnings>, void>({
      query: () => ({
        url: '/payment/instructor/earnings',
        method: 'GET',
      }),
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
} = paymentApi;
