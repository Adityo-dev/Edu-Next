import { apiClient } from '@/redux/apiClient/apiClient';
import { ReviewActionResponse } from '@/types/review.types';

export const studentReviewApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // Add a Review to a purchased course (Student Only)
    addReview: builder.mutation<
      ReviewActionResponse,
      { courseId: string; rating: number; comment: string }
    >({
      query: (body) => ({
        url: '/reviews',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Reviews', 'Courses'],
    }),
  }),
});

export const { useAddReviewMutation } = studentReviewApi;
