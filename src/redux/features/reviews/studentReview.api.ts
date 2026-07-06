import { apiClient } from '@/redux/apiClient/apiClient';
import {
  PaginationQuery,
  ReviewActionResponse,
  StudentReviewStatsResponse,
  StudentSubmittedReviewsResponse,
  StudentUnreviewedCoursesResponse,
} from '@/types/review.types';

export const studentReviewApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // Add a Rating and Review to a purchased course (Student Only)
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

    // Get student review counters (total, published, pending)
    getStudentReviewStats: builder.query<StudentReviewStatsResponse, void>({
      query: () => ({
        url: '/reviews/student/stats',
        method: 'GET',
      }),
      providesTags: ['Reviews'],
    }),

    // Get reviews submitted by authenticated student
    getStudentSubmittedReviews: builder.query<StudentSubmittedReviewsResponse, PaginationQuery>({
      query: (params) => ({
        url: '/reviews/student/submitted',
        method: 'GET',
        params: params || {},
      }),
      providesTags: ['Reviews'],
    }),

    // Get purchased courses that haven't been reviewed yet
    getStudentUnreviewedCourses: builder.query<StudentUnreviewedCoursesResponse, PaginationQuery>({
      query: (params) => ({
        url: '/reviews/student/unreviewed-courses',
        method: 'GET',
        params: params || {},
      }),
      providesTags: ['Reviews', 'Courses'],
    }),

    // Update a previously submitted review (Student Only)
    updateStudentReview: builder.mutation<
      ReviewActionResponse,
      { reviewId: string; rating: number; comment: string }
    >({
      query: ({ reviewId, ...body }) => ({
        url: `/reviews/student/${reviewId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Reviews', 'Courses'],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetStudentReviewStatsQuery,
  useGetStudentSubmittedReviewsQuery,
  useGetStudentUnreviewedCoursesQuery,
  useUpdateStudentReviewMutation,
} = studentReviewApi;
