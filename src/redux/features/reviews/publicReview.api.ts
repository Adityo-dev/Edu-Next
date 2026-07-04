import { apiClient } from '@/redux/apiClient/apiClient';
import { DefaultReviewResponse } from '@/types/review.types';

export const publicReviewApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // Get all public reviews for a specific course
    getCourseReviews: builder.query<DefaultReviewResponse, string>({
      query: (courseId) => ({
        url: `/reviews/course/${courseId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, courseId) => [{ type: 'Reviews', id: courseId }],
    }),
  }),
});

export const { useGetCourseReviewsQuery } = publicReviewApi;
