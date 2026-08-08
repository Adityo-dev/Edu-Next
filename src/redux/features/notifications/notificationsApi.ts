import { apiClient } from '@/redux/apiClient/apiClient';
import { ICommonResponse } from '@/types/courseManagement.types';
import { IGetNotificationsParams, INotificationsResponse } from '@/types/notifications.types';

export const notificationsApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      ICommonResponse<INotificationsResponse>,
      IGetNotificationsParams | undefined
    >({
      query: (params) => ({
        url: '/notifications',
        method: 'GET',
        params,
      }),
      providesTags: ['Notifications'],
    }),

    markAllAsRead: builder.mutation<ICommonResponse<null>, void>({
      query: () => ({
        url: '/notifications/read-all',
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    }),

    clearAllNotifications: builder.mutation<ICommonResponse<null>, void>({
      query: () => ({
        url: '/notifications/all',
        method: 'DELETE',
      }),
      invalidatesTags: ['Notifications'],
    }),

    markNotificationAsRead: builder.mutation<ICommonResponse<null>, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    }),

    deleteNotification: builder.mutation<ICommonResponse<null>, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useClearAllNotificationsMutation,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
} = notificationsApi;
