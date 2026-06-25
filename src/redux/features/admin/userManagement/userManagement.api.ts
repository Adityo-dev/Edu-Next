/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/redux/apiClient/apiClient';
import { TUserListItem, TUserRole, TUserStats, TUserStatus } from '@/types/userRole.types';

// সোয়াগার রেসপন্স অনুযায়ী আপডেট করা হলো
export interface TGetUsersResponse {
  success: boolean;
  message: string;
  data: {
    users: TUserListItem[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

// সোয়াগার প্যারামিটার অনুযায়ী ইন্টারফেস
export interface TGetUsersParams {
  search?: string;
  role?: TUserRole | 'all';
  status?: TUserStatus;
  isVerified?: boolean;
  page?: number;
  limit?: number;
}

export interface TGetUserStatsResponse {
  success: boolean;
  message: string;
  data: TUserStats;
}

export interface TMutationResponse {
  success: boolean;
  message: string;
}

export const userManagementApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // GET /admin/users (সার্ভার-সাইড ফিল্টারিং ও পেজিনেশন সহ)
    getUsers: builder.query<TGetUsersResponse, TGetUsersParams | void>({
      query: (params) => {
        const queryParams: Record<string, any> = {};

        if (params) {
          if (params.search?.trim()) queryParams.search = params.search.trim();
          if (params.role && params.role !== 'all') queryParams.role = params.role;
          if (params.status) queryParams.status = params.status;
          if (params.isVerified !== undefined) queryParams.isVerified = params.isVerified;
          if (params.page) queryParams.page = params.page;
          if (params.limit) queryParams.limit = params.limit;
        }

        return {
          url: '/admin/users',
          method: 'GET',
          params: queryParams,
        };
      },
      providesTags: ['user'],
    }),

    // GET /admin/user-stats
    getUserStats: builder.query<TGetUserStatsResponse, void>({
      query: () => ({
        url: '/admin/user-stats',
        method: 'GET',
      }),
      providesTags: ['user'],
    }),

    // PATCH /admin/users/{id}/status
    updateUserStatus: builder.mutation<TMutationResponse, { id: string; status: TUserStatus }>({
      query: ({ id, status }) => ({
        url: `/admin/users/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['user'],
    }),

    // DELETE /admin/users/{id}
    deleteUser: builder.mutation<TMutationResponse, string>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserStatsQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} = userManagementApi;
