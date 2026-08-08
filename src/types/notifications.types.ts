export interface INotification {
  _id: string;
  user: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

export interface INotificationsResponse {
  notifications: INotification[];
  unreadCount: number;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface IGetNotificationsParams {
  page?: number;
  limit?: number;
  filter?: 'all' | 'unread';
}
