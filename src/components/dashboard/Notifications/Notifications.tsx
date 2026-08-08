/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { getSocket } from '@/lib/socket';
import {
  notificationsApi,
  useClearAllNotificationsMutation,
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkNotificationAsReadMutation,
} from '@/redux/features/notifications/notificationsApi';
import { INotification } from '@/types/notifications.types';

// Helper to determine styles based on notification type
export const getNotificationStyle = (type: string) => {
  switch (type) {
    case 'course_sale':
      return { icon: <CircleDollarSign size={16} />, color: 'bg-emerald-50 text-emerald-600' };
    case 'enrollment':
      return { icon: <Users size={16} />, color: 'bg-purple-50 text-purple-600' };
    case 'support_ticket':
      return { icon: <MessageSquare size={16} />, color: 'bg-orange-50 text-orange-500' };
    case 'course_approved':
      return { icon: <BookOpen size={16} />, color: 'bg-blue-50 text-blue-500' };
    case 'review':
      return { icon: <Star size={16} />, color: 'bg-yellow-50 text-yellow-500' };
    case 'withdrawal':
      return { icon: <CircleDollarSign size={16} />, color: 'bg-emerald-50 text-emerald-600' };
    case 'instructor_application':
      return { icon: <ShieldCheck size={16} />, color: 'bg-yellow-50 text-yellow-500' };
    case 'user_registration':
      return { icon: <Users size={16} />, color: 'bg-purple-50 text-purple-600' };
    case 'revenue_milestone':
      return { icon: <BadgePercent size={16} />, color: 'bg-emerald-50 text-primary' };
    default:
      return { icon: <Bell size={16} />, color: 'bg-slate-100 text-slate-500' };
  }
};

// Formatter for relative time
export const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
};

const Notifications = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const dispatch = useDispatch();

  const { data, isLoading } = useGetNotificationsQuery({
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

  // Socket.io Real-time Integration
  useEffect(() => {
    let socketInstance: any = null;
    let isMounted = true;

    const setupSocket = async () => {
      socketInstance = await getSocket();
      if (socketInstance && isMounted) {
        const handleNewNotification = (newNotif: any) => {
          // Invalidate cache to refetch
          dispatch(notificationsApi.util.invalidateTags(['Notifications']));
          toast.success(newNotif?.title || 'New Notification Received');
        };

        // Listen for new notifications (we assume 'new_notification' as fallback)
        socketInstance.on('new_notification', handleNewNotification);
        socketInstance.on('notification:new', handleNewNotification);

        return () => {
          socketInstance.off('new_notification', handleNewNotification);
          socketInstance.off('notification:new', handleNewNotification);
        };
      }
    };

    setupSocket();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

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
          <div>
            <h1 className="text-text-primary flex items-center gap-2 text-2xl font-black">
              Notifications
              {unreadCount > 0 && (
                <span className="bg-secondary rounded-full px-2.5 py-0.5 text-sm font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className="text-text-secondary mt-1 text-sm">Platform activity and alerts.</p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex cursor-pointer items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50"
              >
                <CheckCheck size={15} /> Mark All Read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex cursor-pointer items-center gap-2 rounded-sm border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-500 transition-all hover:bg-red-50"
              >
                <Trash2 size={15} /> Clear All
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
          {[
            { key: 'all', label: 'All' },
            { key: 'unread', label: `Unread (${unreadCount})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setFilter(tab.key as typeof filter);
                setPage(1);
              }}
              className={`cursor-pointer px-5 py-2.5 text-sm font-semibold transition-all ${
                filter === tab.key ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center rounded-md border border-slate-100 bg-white py-20 text-center shadow-xs">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"></div>
            <p className="mt-4 font-bold text-slate-400">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-md border border-slate-100 bg-white py-20 text-center shadow-xs">
            <Bell size={40} className="mb-4 text-slate-300" />
            <p className="font-bold text-slate-400">No notifications found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notif: INotification) => {
              const style = getNotificationStyle(notif.type);
              return (
                <div
                  key={notif._id}
                  className={`group flex items-start gap-4 rounded-md border p-4 transition-all ${
                    !notif.isRead
                      ? 'border-emerald-100 bg-white shadow-xs'
                      : 'border-slate-100 bg-white opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm ${style.color}`}
                  >
                    {style.icon}
                  </div>
                  <div className="flex-1">
                    <div className="mb-0.5 flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-800">{notif.title}</p>
                      {!notif.isRead && <span className="bg-secondary h-2 w-2 rounded-full" />}
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{notif.message}</p>
                    <p className="text-text-secondary mt-1 text-xs">
                      {formatTimeAgo(notif.createdAt)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 opacity-0 transition-all group-hover:opacity-100">
                    {!notif.isRead && (
                      <button
                        onClick={() => handleMarkRead(notif._id)}
                        className="cursor-pointer text-slate-400 transition-all hover:text-emerald-500"
                        title="Mark as read"
                      >
                        <CheckCheck size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notif._id)}
                      className="cursor-pointer text-slate-400 transition-all hover:text-red-500"
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

        {/* Simple Pagination Controls */}
        {notificationsData?.pagination && notificationsData.pagination.totalPages > 1 && (
          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="cursor-pointer rounded-sm border border-slate-200 bg-white px-3 py-1 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm font-medium text-slate-600">
              Page {page} of {notificationsData.pagination.totalPages}
            </span>
            <button
              disabled={page === notificationsData.pagination.totalPages}
              onClick={() => setPage(page + 1)}
              className="cursor-pointer rounded-sm border border-slate-200 bg-white px-3 py-1 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
