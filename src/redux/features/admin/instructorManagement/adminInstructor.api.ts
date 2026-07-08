import { apiClient } from '@/redux/apiClient/apiClient';

import {
  TGetBadgeRequestsResponse,
  TGetInstructorProfileResponse,
  TApproveBadgeResponse,
  TCancelBadgeResponse,
} from '@/types/adminInstructor.types';

export const adminInstructorApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // GET /admin/instructors/badge-requests
    getBadgeRequests: builder.query<TGetBadgeRequestsResponse, { page?: number; limit?: number }>({
      query: (params) => ({
        url: '/admin/instructors/badge-requests',
        method: 'GET',
        params,
      }),
      providesTags: ['InstructorBadgeRequests'],
    }),

    // GET /admin/instructors/{id}
    getInstructorProfile: builder.query<TGetInstructorProfileResponse, string>({
      query: (id) => ({
        url: `/admin/instructors/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'InstructorProfile', id }],
    }),

    // PATCH /admin/instructors/{id}/approve
    approveBadgeRequest: builder.mutation<
      TApproveBadgeResponse,
      { id: string; action: 'approve' | 'reject' }
    >({
      query: ({ id, action }) => ({
        url: `/admin/instructors/${id}/approve`,
        method: 'PATCH',
        body: { action },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'InstructorProfile', id },
        'InstructorBadgeRequests',
        'user',
      ],
    }),

    // PATCH /admin/instructors/{id}/cancel-badge
    cancelInstructorBadge: builder.mutation<
      TCancelBadgeResponse,
      { id: string; cancelReason: string }
    >({
      query: ({ id, cancelReason }) => ({
        url: `/admin/instructors/${id}/cancel-badge`,
        method: 'PATCH',
        body: { cancelReason },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'InstructorProfile', id },
        'InstructorBadgeRequests',
        'user',
      ],
    }),
  }),
});

export const {
  useGetBadgeRequestsQuery,
  useGetInstructorProfileQuery,
  useApproveBadgeRequestMutation,
  useCancelInstructorBadgeMutation,
} = adminInstructorApi;
