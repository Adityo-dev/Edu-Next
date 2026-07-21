import { apiClient } from '@/redux/apiClient/apiClient';
import { CourseReviewsResponse } from '@/types/review.types';

export const publicReviewApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Public Reviews for a Specific Course
    getCourseReviews: builder.query<CourseReviewsResponse, string>({
      query: (courseId) => ({
        url: `/reviews/course/${courseId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, courseId) => [{ type: 'Reviews', id: courseId }],
    }),
  }),
});

export const { useGetCourseReviewsQuery } = publicReviewApi;
