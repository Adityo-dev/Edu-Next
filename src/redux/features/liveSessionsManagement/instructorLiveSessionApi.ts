/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/redux/apiClient/apiClient';
import {
  ICourseSessionsResponse,
  IInstructorDashboardSessionsResponse,
  IInstructorLiveSessionStatsResponse,
  IScheduleSessionPayload,
  IUpdateSessionPayload,
} from '@/types/liveSessions.types';

export const instructorLiveSessionApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getInstructorLiveSessionStats: builder.query<IInstructorLiveSessionStatsResponse, void>({
      query: () => ({ url: '/live-sessions/instructor/stats', method: 'GET' }),
      providesTags: ['InstructorLiveSessionStats'],
    }),

    getInstructorDashboardSessions: builder.query<
      IInstructorDashboardSessionsResponse,
      { status?: 'all' | 'live' | 'upcoming' | 'completed' }
    >({
      query: ({ status = 'all' }) => ({
        url: '/live-sessions/instructor/dashboard',
        method: 'GET',
        params: { status },
      }),
      providesTags: ['InstructorLiveSessions'],
    }),

    scheduleLiveSession: builder.mutation<
      { success: boolean; message: string; data?: any },
      IScheduleSessionPayload
    >({
      query: (payload) => ({ url: '/live-sessions', method: 'POST', body: payload }),
      invalidatesTags: ['InstructorLiveSessions', 'InstructorLiveSessionStats'],
    }),

    getLiveSessionsByCourse: builder.query<ICourseSessionsResponse, string>({
      query: (courseId) => ({ url: `/live-sessions/course/${courseId}`, method: 'GET' }),
      providesTags: ['CourseLiveSessions'],
    }),

    updateLiveSession: builder.mutation<
      { success: boolean; message: string; data?: any },
      { sessionId: string; payload: IUpdateSessionPayload }
    >({
      query: ({ sessionId, payload }) => ({
        url: `/live-sessions/${sessionId}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [
        'InstructorLiveSessions',
        'InstructorLiveSessionStats',
        'CourseLiveSessions',
      ],
    }),
  }),
});

export const {
  useGetInstructorLiveSessionStatsQuery,
  useGetInstructorDashboardSessionsQuery,
  useScheduleLiveSessionMutation,
  useGetLiveSessionsByCourseQuery,
  useUpdateLiveSessionMutation,
} = instructorLiveSessionApi;
