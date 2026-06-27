import { apiClient } from '@/redux/apiClient/apiClient';
import {
  IJoinSessionResponse,
  ILiveSessionStatsResponse,
  IStudentDashboardSessionsResponse,
} from '@/types/liveSessions.types';

export const studentLiveSessionApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getStudentLiveSessionStats: builder.query<ILiveSessionStatsResponse, void>({
      query: () => ({ url: '/live-sessions/student/stats', method: 'GET' }),
      providesTags: ['LiveSessionStats'],
    }),

    getStudentDashboardSessions: builder.query<
      IStudentDashboardSessionsResponse,
      { status?: 'all' | 'live' | 'upcoming' | 'completed' }
    >({
      query: ({ status = 'all' }) => ({
        url: '/live-sessions/student/dashboard',
        method: 'GET',
        params: { status },
      }),
      providesTags: ['StudentLiveSessions'],
    }),

    joinLiveSession: builder.mutation<IJoinSessionResponse, string>({
      query: (sessionId) => ({ url: `/live-sessions/${sessionId}/join`, method: 'POST' }),
      invalidatesTags: ['StudentLiveSessions', 'LiveSessionStats'],
    }),
  }),
});

export const {
  useGetStudentLiveSessionStatsQuery,
  useGetStudentDashboardSessionsQuery,
  useJoinLiveSessionMutation,
} = studentLiveSessionApi;
