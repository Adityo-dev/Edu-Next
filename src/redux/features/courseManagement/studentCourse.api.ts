import { apiClient } from '@/redux/apiClient/apiClient';
import {
  ICommonResponse,
  ICoursePlaybackData,
  IStudentStats,
} from '@/types/courseManagement.types';

export const studentCourseApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getMyEnrolledCourses: builder.query<
      ICommonResponse<unknown>,
      { search?: string; stats?: string; page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: '/enrollments/my-enrolled',
        method: 'GET',
        params: params || {},
      }),
      providesTags: ['Courses'],
    }),

    // 2. Get student course statistics
    getMyStats: builder.query<ICommonResponse<IStudentStats>, void>({
      query: () => ({
        url: '/enrollments/my-stats',
        method: 'GET',
      }),
      providesTags: ['CourseStats'],
    }),

    // 3. Get course playback data
    getCoursePlaybackData: builder.query<ICommonResponse<ICoursePlaybackData>, string>({
      query: (id) => ({
        url: `/courses/${id}/play`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Courses', id }],
    }),

    // 4. Mark lesson as complete
    markLessonAsComplete: builder.mutation<
      ICommonResponse<unknown>,
      { courseId: string; lessonId: string }
    >({
      query: ({ courseId, lessonId }) => ({
        url: `/progress/${courseId}/lesson/${lessonId}/complete`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: 'Courses', id: courseId },
        'Courses',
        'CourseStats',
      ],
    }),
  }),
});

export const {
  useGetMyEnrolledCoursesQuery,
  useGetMyStatsQuery,
  useGetCoursePlaybackDataQuery,
  useMarkLessonAsCompleteMutation,
} = studentCourseApi;
