import { apiClient } from '@/redux/apiClient/apiClient';
import { TUserListItem, TUserRole, TUserStats, TUserStatus } from '@/types/userRole.types';

export interface TGetUsersResponse {
  success: boolean;
  count: number;
  data: TUserListItem[];
}

export interface TGetUsersParams {
  role?: TUserRole;
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
    // GET /admin/users?role=...
    getUsers: builder.query<TGetUsersResponse, TGetUsersParams | void>({
      query: (params) => ({
        url: '/admin/users',
        method: 'GET',
        params: params?.role ? { role: params.role } : undefined,
      }),
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
