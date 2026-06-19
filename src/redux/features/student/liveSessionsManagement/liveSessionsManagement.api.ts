import { apiClient } from '@/redux/apiClient/apiClient';
import { ApiResponse, StudentLiveSession, StudentStats } from '@/types/liveSessions.types';

export const studentLiveSessionsApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getStudentLiveSessionStats: builder.query<ApiResponse<StudentStats>, void>({
      query: () => ({
        url: '/live-sessions/student/stats',
        method: 'GET',
      }),
      providesTags: ['liveSessions'],
    }),

    getStudentDashboardSessions: builder.query<ApiResponse<StudentLiveSession[]>, string | void>({
      query: (status = 'all') => ({
        url: `/live-sessions/student/dashboard`,
        method: 'GET',
        params: { status },
      }),
      providesTags: ['liveSessions'],
    }),

    getStudentSessionsByCourse: builder.query<ApiResponse<StudentLiveSession[]>, string>({
      query: (courseId) => ({
        url: `/live-sessions/course/${courseId}`,
        method: 'GET',
      }),
      providesTags: ['liveSessions'],
    }),
  }),
});

export const {
  useGetStudentLiveSessionStatsQuery,
  useGetStudentDashboardSessionsQuery,
  useGetStudentSessionsByCourseQuery,
} = studentLiveSessionsApi;
