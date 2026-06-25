/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/redux/apiClient/apiClient';
import { ICourse, ICourseStats, TQueryResponse } from '@/types/courseManagement.types';

export const adminCourseApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // GET /courses/admin/courses - Get all courses for admin dashboard (Admin Only)
    getAdminCourses: builder.query<
      TQueryResponse<{ courses: ICourse[]; pagination: any }>,
      Record<string, any>
    >({
      query: (params) => ({
        url: '/courses/admin/courses',
        method: 'GET',
        params,
      }),
      providesTags: ['AdminCourses'],
    }),

    // GET /courses/admin/course-stats - Get course management overview stats (Admin Only)
    getCourseStats: builder.query<TQueryResponse<ICourseStats>, void>({
      query: () => ({
        url: '/courses/admin/course-stats',
        method: 'GET',
      }),
      providesTags: ['CourseStats'],
    }),

    // PATCH /courses/{id}/status - Approve, reject, or change course status (Admin Only)
    updateCourseStatus: builder.mutation<
      TQueryResponse<ICourse>,
      { id: string; payload: { status: string; rejectedReason?: string; badge?: string } }
    >({
      query: ({ id, payload }) => ({
        url: `/courses/${id}/status`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['AdminCourses', 'CourseStats', 'Courses', 'InstructorCourses'],
    }),
  }),
});

export const { useGetAdminCoursesQuery, useGetCourseStatsQuery, useUpdateCourseStatusMutation } =
  adminCourseApi;
