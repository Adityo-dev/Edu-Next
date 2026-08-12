import { apiClient } from '@/redux/apiClient/apiClient';
import { IStudentCourseOverviewStats, IStudentWelcomeStats } from '@/types/overview.types';
import { ICommonResponse } from '@/types/courseManagement.types';

export const studentOverviewApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getMyCourseStats: builder.query<ICommonResponse<IStudentCourseOverviewStats>, void>({
      query: () => ({
        url: '/overview/student/course-stats',
        method: 'GET',
      }),
      providesTags: ['CourseStats'],
    }),
    getStudentWelcomeStats: builder.query<ICommonResponse<IStudentWelcomeStats>, void>({
      query: () => ({
        url: '/overview/student/welcome',
        method: 'GET',
      }),
      providesTags: ['CourseStats'],
    }),
  }),
});

export const { useGetMyCourseStatsQuery, useGetStudentWelcomeStatsQuery } = studentOverviewApi;
