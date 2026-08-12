import { apiClient } from '@/redux/apiClient/apiClient';
import { ICommonResponse } from '@/types/courseManagement.types';
import { IAdminWelcomeStats } from '@/types/overview.types';

export const adminOverviewApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getAdminWelcomeStats: builder.query<ICommonResponse<IAdminWelcomeStats>, void>({
      query: () => ({
        url: '/overview/admin/welcome',
        method: 'GET',
      }),
      providesTags: ['AdminStats'],
    }),
  }),
});

export const { useGetAdminWelcomeStatsQuery } = adminOverviewApi;
