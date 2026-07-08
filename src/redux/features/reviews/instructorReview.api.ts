import { apiClient } from '@/redux/apiClient/apiClient';
import {
  IInstructorReviewQuery,
  InstructorReviewsResponse,
  InstructorReviewStatsResponse,
} from '@/types/review.types';

export const instructorReviewApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // Get Instructor's Course Reviews with Pagination & Filter (Instructor Only)
    getInstructorReviews: builder.query<InstructorReviewsResponse, IInstructorReviewQuery>({
      query: (params) => ({
        url: '/reviews/instructor/reviews',
        method: 'GET',
        params,
      }),
      providesTags: ['Reviews'],
    }),

    // Get Instructor Review Stats (averageRating, totalReviews, starDistribution)
    getInstructorReviewStats: builder.query<InstructorReviewStatsResponse, void>({
      query: () => ({
        url: '/reviews/instructor/stats',
        method: 'GET',
      }),
      providesTags: ['Reviews'],
    }),
  }),
});

export const { useGetInstructorReviewsQuery, useGetInstructorReviewStatsQuery } =
  instructorReviewApi;
