import { apiClient } from '@/redux/apiClient/apiClient';
import { TResponseRedux } from '@/types/apiResponse.types';
import { TOverviewStats, TQuickActionStats } from '@/types/dashboard.types';

export const dashboardApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // GET /admin/overview-stats
    getOverviewStats: builder.query<TResponseRedux<TOverviewStats>, void>({
      query: () => ({
        url: '/admin/overview-stats',
        method: 'GET',
      }),
      providesTags: ['AdminDashboard'],
    }),

    // GET /admin/quick-action-stats
    getQuickActionStats: builder.query<TResponseRedux<TQuickActionStats>, void>({
      query: () => ({
        url: '/admin/quick-action-stats',
        method: 'GET',
      }),
      providesTags: ['AdminDashboard'],
    }),
  }),
});

export const { useGetOverviewStatsQuery, useGetQuickActionStatsQuery } = dashboardApi;
