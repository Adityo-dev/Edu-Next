import { apiClient } from '@/redux/apiClient/apiClient';
import { ICommonResponse } from '@/types/courseManagement.types';
import {
  IStudentOverallProgress,
  IStudentSummaryCards,
  IStudentWeeklyActivity,
} from '@/types/progress.types';

export const studentProgressApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getStudentOverallProgress: builder.query<ICommonResponse<IStudentOverallProgress>, void>({
      query: () => ({
        url: '/progress/student/overall',
        method: 'GET',
      }),
      providesTags: ['StudentProgress'],
    }),
    getStudentSummaryCards: builder.query<ICommonResponse<IStudentSummaryCards>, void>({
      query: () => ({
        url: '/progress/student/summary-cards',
        method: 'GET',
      }),
      providesTags: ['StudentProgress'],
    }),
    getStudentWeeklyActivity: builder.query<ICommonResponse<IStudentWeeklyActivity[]>, void>({
      query: () => ({
        url: '/progress/student/weekly-activity',
        method: 'GET',
      }),
      providesTags: ['StudentProgress'],
    }),
  }),
});

export const {
  useGetStudentOverallProgressQuery,
  useGetStudentSummaryCardsQuery,
  useGetStudentWeeklyActivityQuery,
} = studentProgressApi;
