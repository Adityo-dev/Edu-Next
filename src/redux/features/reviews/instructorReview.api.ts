import { apiClient } from '@/redux/apiClient/apiClient';
import { IInstructorReviewQuery, InstructorReviewsResponse } from '@/types/review.types';

export const instructorReviewApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // Get Instructor's Course Reviews with Pagination & Filter (Instructor Only)
    getInstructorReviews: builder.query<InstructorReviewsResponse, IInstructorReviewQuery>({
      query: (params) => ({
        url: '/reviews/instructor/dashboard',
        method: 'GET',
        params,
      }),
      providesTags: ['Reviews'],
    }),
  }),
});

export const { useGetInstructorReviewsQuery } = instructorReviewApi;
