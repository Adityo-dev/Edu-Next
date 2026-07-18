import { apiClient } from '@/redux/apiClient/apiClient';
import {
  IAdminCoursesQueryParams,
  ICommonResponse,
  ICourse,
  ICourseStats,
  IPaginatedData,
  IUpdateStatusPayload,
} from '@/types/courseManagement.types';

export const adminCourseApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get all courses for admin dashboard
    getAdminCourses: builder.query<
      ICommonResponse<IPaginatedData<ICourse>>,
      IAdminCoursesQueryParams
    >({
      query: (params) => ({
        url: '/courses/admin/courses',
        method: 'GET',
        params,
      }),
      providesTags: ['AdminCourses'],
    }),

    // 2. Get course management overview stats
    getAdminCourseStats: builder.query<ICommonResponse<ICourseStats>, void>({
      query: () => ({
        url: '/courses/admin/course-stats',
        method: 'GET',
      }),
      providesTags: ['CourseStats'],
    }),

    // 3. Approve, reject, suspend, or change course status
    updateCourseStatus: builder.mutation<
      ICommonResponse<ICourse>,
      { id: string; payload: IUpdateStatusPayload }
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

export const {
  useGetAdminCoursesQuery,
  useGetAdminCourseStatsQuery,
  useUpdateCourseStatusMutation,
} = adminCourseApi;
