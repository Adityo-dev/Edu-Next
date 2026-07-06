import { apiClient } from '@/redux/apiClient/apiClient';
import { DefaultReviewResponse } from '@/types/review.types';

// ─── PUBLIC REVIEW API ───
export const publicReviewApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Public Reviews for a Specific Course
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
