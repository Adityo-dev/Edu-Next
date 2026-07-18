import { apiClient } from '@/redux/apiClient/apiClient';
import {
  ICommonResponse,
  ICourse,
  IInstructorAnalyticsGrowth,
  IInstructorAnalyticsStats,
  IInstructorCoursePerformanceData,
  IInstructorCoursePerformanceQueryParams,
  IInstructorCoursesQueryParams,
  IInstructorRevenueOverview,
  IInstructorStudentsData,
  IInstructorStudentsQueryParams,
  IInstructorStudentStats,
  IPaginatedData,
} from '@/types/courseManagement.types';

export const instructorCourseApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Create a new course (Strictly as draft)
    createCourse: builder.mutation<ICommonResponse<ICourse>, Partial<ICourse>>({
      query: (courseData) => ({
        url: '/courses',
        method: 'POST',
        body: courseData,
      }),
      invalidatesTags: ['InstructorCourses', 'CourseStats', 'AdminCourses'],
    }),

    // 2. Get instructor's own dashboard courses
    getInstructorCourses: builder.query<
      ICommonResponse<IPaginatedData<ICourse>>,
      IInstructorCoursesQueryParams | undefined
    >({
      query: (params) => ({
        url: '/courses/instructor/my-courses',
        method: 'GET',
        params,
      }),
      providesTags: ['InstructorCourses'],
    }),

    // 3. Get single course by slug for instructor
    getInstructorCourseBySlug: builder.query<ICommonResponse<ICourse>, string>({
      query: (slug) => ({
        url: `/courses/${slug}`,
        method: 'GET',
      }),
      providesTags: (result, error, slug) => [{ type: 'InstructorCourses', id: slug }],
    }),

    // 4. Update course content or lessons
    updateCourseContent: builder.mutation<
      ICommonResponse<ICourse>,
      { id: string; payload: Partial<ICourse> }
    >({
      query: ({ id, payload }) => ({
        url: `/courses/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'InstructorCourses', id },
        'InstructorCourses',
        'Courses',
      ],
    }),

    // 5. Request admin review to publish a draft or rejected course
    submitPublishRequest: builder.mutation<ICommonResponse<ICourse>, string>({
      query: (id) => ({
        url: `/courses/${id}/publish-request`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'InstructorCourses', id },
        'InstructorCourses',
        'AdminCourses',
      ],
    }),

    // 6. Delete a course entirely (Only allowed if no enrollments & draft/rejected)
    deleteCourse: builder.mutation<ICommonResponse<null>, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['InstructorCourses', 'CourseStats', 'AdminCourses'],
    }),

    // 6. Get instructor students stats
    getInstructorStudentsStats: builder.query<ICommonResponse<IInstructorStudentStats>, void>({
      query: () => ({
        url: '/enrollments/instructor/students/stats',
        method: 'GET',
      }),
      providesTags: ['CourseStats'],
    }),

    // 7. Get instructor students
    getInstructorStudents: builder.query<
      ICommonResponse<IInstructorStudentsData>,
      IInstructorStudentsQueryParams | undefined
    >({
      query: (params) => ({
        url: '/enrollments/instructor/students',
        method: 'GET',
        params,
      }),
      providesTags: ['CourseStats'],
    }),

    // 8. Get instructor analytics stats (Cards)
    getInstructorAnalyticsStats: builder.query<ICommonResponse<IInstructorAnalyticsStats>, void>({
      query: () => ({
        url: '/courses/instructor/analytics/stats',
        method: 'GET',
      }),
      providesTags: ['CourseStats'],
    }),

    // 9. Get instructor analytics growth
    getInstructorAnalyticsGrowth: builder.query<ICommonResponse<IInstructorAnalyticsGrowth>, void>({
      query: () => ({
        url: '/courses/instructor/analytics/growth',
        method: 'GET',
      }),
      providesTags: ['CourseStats'],
    }),

    // 10. Get instructor revenue overview (Chart)
    getInstructorRevenueOverview: builder.query<ICommonResponse<IInstructorRevenueOverview>, void>({
      query: () => ({
        url: '/courses/instructor/analytics/revenue-overview',
        method: 'GET',
      }),
      providesTags: ['CourseStats'],
    }),

    // 11. Get instructor course performance (Table)
    getInstructorCoursePerformance: builder.query<
      ICommonResponse<IInstructorCoursePerformanceData>,
      IInstructorCoursePerformanceQueryParams | undefined
    >({
      query: (params) => ({
        url: '/courses/instructor/analytics/performance',
        method: 'GET',
        params,
      }),
      providesTags: ['CourseStats'],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetInstructorCoursesQuery,
  useGetInstructorCourseBySlugQuery,
  useUpdateCourseContentMutation,
  useSubmitPublishRequestMutation,
  useDeleteCourseMutation,
  useGetInstructorStudentsStatsQuery,
  useGetInstructorStudentsQuery,
  useGetInstructorAnalyticsStatsQuery,
  useGetInstructorAnalyticsGrowthQuery,
  useGetInstructorRevenueOverviewQuery,
  useGetInstructorCoursePerformanceQuery,
} = instructorCourseApi;
