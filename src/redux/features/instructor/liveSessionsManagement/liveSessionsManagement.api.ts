import { apiClient } from '@/redux/apiClient/apiClient';
import { ApiResponse, InstructorLiveSession, InstructorStats } from '@/types/liveSessions.types';

export const instructorLiveSessionsApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getInstructorLiveSessionStats: builder.query<ApiResponse<InstructorStats>, void>({
      query: () => ({
        url: '/live-sessions/instructor/stats',
        method: 'GET',
      }),
      providesTags: ['liveSessions'],
    }),

    getInstructorDashboardSessions: builder.query<
      ApiResponse<InstructorLiveSession[]>,
      string | void
    >({
      query: (status = 'all') => ({
        url: `/live-sessions/instructor/dashboard`,
        method: 'GET',
        params: { status },
      }),
      providesTags: ['liveSessions'],
    }),

    scheduleLiveSession: builder.mutation<
      ApiResponse<InstructorLiveSession>,
      Partial<InstructorLiveSession> & { courseId: string }
    >({
      query: (body) => ({
        url: '/live-sessions',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['liveSessions'],
    }),

    updateLiveSession: builder.mutation<
      ApiResponse<InstructorLiveSession>,
      { sessionId: string; body: Partial<InstructorLiveSession> }
    >({
      query: ({ sessionId, body }) => ({
        url: `/live-sessions/${sessionId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['liveSessions'],
    }),

    getInstructorSessionsByCourse: builder.query<ApiResponse<InstructorLiveSession[]>, string>({
      query: (courseId) => ({
        url: `/live-sessions/course/${courseId}`,
        method: 'GET',
      }),
      providesTags: ['liveSessions'],
    }),
  }),
});

export const {
  useGetInstructorLiveSessionStatsQuery,
  useGetInstructorDashboardSessionsQuery,
  useScheduleLiveSessionMutation,
  useUpdateLiveSessionMutation,
  useGetInstructorSessionsByCourseQuery,
} = instructorLiveSessionsApi;
