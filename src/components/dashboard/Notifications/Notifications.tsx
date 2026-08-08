'use client';

import {
  BadgePercent,
  Bell,
  BookOpen,
  CheckCheck,
  CircleDollarSign,
  MessageSquare,
  ShieldCheck,
  Star,
  Trash2,
  Users,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import {
  useClearAllNotificationsMutation,
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkNotificationAsReadMutation,
} from '@/redux/features/notifications/notificationsApi';
import { INotification } from '@/types/notifications.types';
import { GetRelativeTime } from '@/utils/formatDateTime';
import CustomPagination from '../CustomPagination/CustomPagination';
import DynamicActionButton from '../DynamicActionButton/DynamicActionButton';
import DynamicTableFilterBar from '../DynamicTableFilterBar/DynamicTableFilterBar';
import SectionHeader from '../SectionHeader/SectionHeader';
import EmptyState from '../EmptyState/EmptyState';
import ErrorState from '../ErrorState/ErrorState';
import NotificationSkeleton from '../Skeletons/NotificationSkeleton';

// Helper to determine styles based on notification type
export const getNotificationStyle = (type: string) => {
  switch (type) {
    case 'course_sale':
      return { icon: CircleDollarSign, color: '#059669' };
    case 'enrollment':
      return { icon: Users, color: '#9333ea' };
    case 'support_ticket':
      return { icon: MessageSquare, color: '#f97316' };
    case 'course_approved':
      return { icon: BookOpen, color: '#3b82f6' };
    case 'review':
      return { icon: Star, color: '#eab308' };
    case 'withdrawal':
      return { icon: CircleDollarSign, color: '#059669' };
    case 'instructor_application':
      return { icon: ShieldCheck, color: '#eab308' };
    case 'user_registration':
      return { icon: Users, color: '#9333ea' };
    case 'revenue_milestone':
      return { icon: BadgePercent, color: '#0f766e' };
    default:
      return { icon: Bell, color: '#64748b' };
  }
};

const Notifications = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const filter = (searchParams.get('filter') as 'all' | 'unread') || 'all';

  const { data, isLoading, isError, refetch } = useGetNotificationsQuery({
    page,
    limit: 20,
    filter,
  });

  const [markAllAsRead] = useMarkAllAsReadMutation();
  const [clearAllNotifications] = useClearAllNotificationsMutation();
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const notificationsData = data?.data;
  const notifications = notificationsData?.notifications || [];
  const unreadCount = notificationsData?.unreadCount || 0;

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead().unwrap();
      toast.success('All notifications marked as read');
    } catch {
      toast.error('Failed to mark all as read');
    }
  };

  const handleClearAll = async () => {
    try {
      await clearAllNotifications().unwrap();
      toast.success('All notifications cleared');
    } catch {
      toast.error('Failed to clear notifications');
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
    } catch {
      toast.error('Failed to mark as read');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id).unwrap();
      toast.success('Notification deleted');
    } catch {
      toast.error('Failed to delete notification');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <SectionHeader
            title={`Notifications ${unreadCount}`}
            description="Platform activity and alerts."
          />
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <DynamicActionButton
                label="Mark All Read"
                onClick={handleMarkAllRead}
                className="h-10!"
                showIcon
                icon={CheckCheck}
              />
            )}
            {notifications.length > 0 && (
              <DynamicActionButton
                label="Clear All"
                onClick={handleClearAll}
                className="h-10!"
                showIcon
                icon={Trash2}
                variant="danger"
              />
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <DynamicTableFilterBar
          fields={[
            {
              name: 'filter',
              type: 'tabs',
              value: filter,
              options: [
                { label: 'All', value: 'all' },
                { label: `Unread (${unreadCount})`, value: 'unread' },
              ],
            },
          ]}
        />

        {/* List */}
        {isLoading ? (
          <NotificationSkeleton />
        ) : isError ? (
          <ErrorState
            title="Failed to load notifications"
            message="There was an error while fetching your notifications. Please try again."
            onRetry={refetch}
          />
        ) : notifications.length === 0 ? (
          <EmptyState
            title="No Notifications Found"
            description="You're all caught up! There are no new notifications to show right now."
            icon={Bell}
          />
        ) : (
          <div className="space-y-2">
            {notifications.map((notif: INotification) => {
              const style = getNotificationStyle(notif?.type);
              const Icon = style.icon;
              return (
                <div
                  key={notif?._id}
                  className={`group flex items-start gap-4 rounded-md border p-3 transition-all ${
                    !notif?.isRead
                      ? 'border-primary/30 bg-white'
                      : 'border-border bg-white opacity-65'
                  }`}
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm"
                    style={{ backgroundColor: `${style.color}1A`, color: style.color }}
                  >
                    <Icon size={16} color={style.color} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-0.5 flex items-center gap-2">
                      <p className="text-sm font-semibold">{notif?.title}</p>
                      {!notif?.isRead && <span className="bg-secondary h-2 w-2 rounded-full" />}
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{notif?.message}</p>
                    <p className="text-text-secondary mt-1 text-xs">
                      {GetRelativeTime(notif?.createdAt)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 transition-all">
                    {!notif?.isRead && (
                      <button
                        onClick={() => handleMarkRead(notif?._id)}
                        className="text-success cursor-pointer transition-all"
                        title="Mark as read"
                      >
                        <CheckCheck size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notif?._id)}
                      className="text-danger cursor-pointer transition-all"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {notificationsData?.pagination && notificationsData.pagination.totalPages > 1 && (
          <CustomPagination meta={notificationsData.pagination} />
        )}
      </div>
    </div>
  );
};

export default Notifications;
