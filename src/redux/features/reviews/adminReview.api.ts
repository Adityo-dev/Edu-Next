import { apiClient } from '@/redux/apiClient/apiClient';
import { AdminPendingReviewsResponse, ReviewActionResponse } from '@/types/review.types';

export const adminReviewApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // Get Pending Reviews (On Admin)
    getPendingReviews: builder.query<AdminPendingReviewsResponse, void>({
      query: () => ({
        url: '/reviews/admin/pending',
        method: 'GET',
      }),
      providesTags: ['Reviews'],
    }),

    // Publish a Review (On Admin)
    publishReview: builder.mutation<ReviewActionResponse, string>({
      query: (reviewId) => ({
        url: `/reviews/admin/${reviewId}/publish`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Reviews', 'Courses'],
    }),

    // Reject a Review (On Admin)
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
  }),
});

export const { useGetPendingReviewsQuery, usePublishReviewMutation, useRejectReviewMutation } =
  adminReviewApi;
