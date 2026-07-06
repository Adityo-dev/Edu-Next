import { apiClient } from '@/redux/apiClient/apiClient';
import {
  AdminReviewQuery,
  AdminReviewsResponse,
  AdminReviewStatsResponse,
  ReviewActionResponse,
} from '@/types/review.types';

export const adminReviewApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // Get all reviews with filters, pagination & search (Admin Only)
    getAdminReviews: builder.query<AdminReviewsResponse, AdminReviewQuery>({
      query: (params) => ({
        url: '/reviews/admin',
        method: 'GET',
        params: params || {},
      }),
      providesTags: ['Reviews'],
    }),

    // Get admin review status counters (pending, published, rejected)
    getAdminReviewStats: builder.query<AdminReviewStatsResponse, void>({
      query: () => ({
        url: '/reviews/admin/stats',
        method: 'GET',
      }),
      providesTags: ['Reviews'],
    }),

    // Publish a Pending Review (Admin Only)
    publishReview: builder.mutation<ReviewActionResponse, string>({
      query: (reviewId) => ({
        url: `/reviews/admin/${reviewId}/publish`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Reviews', 'Courses'],
    }),

    // Reject a Pending Review with Reason (Admin Only)
    rejectReview: builder.mutation<
      ReviewActionResponse,
      { reviewId: string; rejectionReason: string }
    >({
      query: ({ reviewId, rejectionReason }) => ({
        url: `/reviews/admin/${reviewId}/reject`,
        method: 'PATCH',
        body: { rejectionReason },
      }),
      invalidatesTags: ['Reviews', 'Courses'],
    }),

    // Delete a Review with reason (Admin Only)
    deleteReviewByAdmin: builder.mutation<
      ReviewActionResponse,
      { reviewId: string; reason: string }
    >({
      query: ({ reviewId, reason }) => ({
        url: `/reviews/admin/${reviewId}`,
        method: 'DELETE',
        body: { reason },
      }),
      invalidatesTags: ['Reviews', 'Courses'],
    }),
  }),
});

export const {
  useGetAdminReviewsQuery,
  useGetAdminReviewStatsQuery,
  usePublishReviewMutation,
  useRejectReviewMutation,
  useDeleteReviewByAdminMutation,
} = adminReviewApi;
