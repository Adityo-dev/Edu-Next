import { apiClient } from '@/redux/apiClient/apiClient';
import { ICommonResponse } from '@/types/courseManagement.types';
import { IInstructorWelcomeStats, IInstructorOverviewStatus } from '@/types/overview.types';

export const instructorOverviewApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getInstructorWelcomeStats: builder.query<ICommonResponse<IInstructorWelcomeStats>, void>({
      query: () => ({
        url: '/overview/instructor/welcome',
        method: 'GET',
      }),
      providesTags: ['InstructorStats'],
    }),
    getInstructorOverviewStatus: builder.query<ICommonResponse<IInstructorOverviewStatus>, void>({
      query: () => ({
        url: '/overview/instructor/status',
        method: 'GET',
      }),
      providesTags: ['InstructorStats'],
    }),
  }),
});

export const { useGetInstructorWelcomeStatsQuery, useGetInstructorOverviewStatusQuery } =
  instructorOverviewApi;
