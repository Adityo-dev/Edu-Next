/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { getNotificationStyle } from '@/components/dashboard/Notifications/Notifications';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getSocket } from '@/lib/socket';
import { useCurrentUser } from '@/redux/features/auth/authSlice';
import {
  notificationsApi,
  useGetNotificationsQuery,
} from '@/redux/features/notifications/notificationsApi';
import { useAppSelector } from '@/redux/hooks';
import { INotification } from '@/types/notifications.types';
import { GetRelativeTime } from '@/utils/formatDateTime';
import { Bell, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

export default function NotificationDropdown({ role }: { role: string }) {
  const { data } = useGetNotificationsQuery({ limit: 5 });
  const unreadCount = data?.data?.unreadCount || 0;
  const notifications = data?.data?.notifications || [];

  const dispatch = useDispatch();
  const user = useAppSelector(useCurrentUser);
  // Global Socket Listener for Real-time Notifications
  useEffect(() => {
    let socketInstance: any = null;
    let isMounted = true;

    const setupSocket = async () => {
      socketInstance = await getSocket();
      if (socketInstance && isMounted) {
        const userId = user?._id || (user as any)?.id;

        // Function to join room
        const joinRoom = () => {
          if (userId) {
            socketInstance.emit('joinUserRoom', userId);
          }
        };

        // If already connected, join immediately
        if (socketInstance.connected) {
          joinRoom();
        }

        // Always join on connect/reconnect
        socketInstance.on('connect', joinRoom);

        const handleNewNotification = (newNotif: INotification) => {
          // Invalidate cache to refetch
          dispatch(notificationsApi.util.invalidateTags(['Notifications']));
          toast.success(newNotif?.title || 'New Notification Received');
        };

        // Listen for new notifications
        socketInstance.on('newNotification', handleNewNotification);

        return () => {
          socketInstance.off('connect', joinRoom);
          socketInstance.off('newNotification', handleNewNotification);
        };
      }
    };

    setupSocket();

    return () => {
      isMounted = false;
    };
  }, [dispatch, user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hover:text-primary border-border text-text-secondary hover:bg-primary/15 relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border bg-white transition-all outline-none hover:border-emerald-100 active:scale-95">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="bg-secondary border-border absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full border px-1 text-[9px] font-semibold text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="border-border w-80 rounded-md border bg-white shadow-lg shadow-slate-100"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="text-sm font-semibold">Notifications</span>
          {unreadCount > 0 && <DynamicBadge text={`${unreadCount} New`} />}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="m-0 bg-slate-100" />

        <DropdownMenuGroup className="max-h-87.5 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell size={24} className="mb-2 text-slate-200" />
              <p className="text-xs font-bold text-slate-400">No new notifications</p>
            </div>
          ) : (
            notifications.map((notif: INotification) => {
              const style = getNotificationStyle(notif?.type);
              const Icon = style?.icon;
              return (
                <DropdownMenuItem
                  key={notif?._id}
                  asChild
                  className="cursor-pointer border-b border-slate-50 px-4 py-3 outline-none last:border-0 hover:bg-slate-50 focus:bg-slate-50"
                >
                  <Link
                    href={`/dashboard/${role}/notifications`}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm"
                      style={{ backgroundColor: `${style?.color}1A`, color: style?.color }}
                    >
                      <Icon size={16} color={style?.color} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="mb-0.5 flex items-center gap-2">
                        <p className="truncate text-xs font-semibold">{notif?.title}</p>
                        {!notif?.isRead && (
                          <span className="bg-secondary h-1.5 w-1.5 shrink-0 rounded-full" />
                        )}
                      </div>
                      <p className="text-text-secondary line-clamp-1 text-[11px] leading-relaxed">
                        {notif?.message}
                      </p>
                      <p className="text-text-secondary mt-1 text-[10px]">
                        {GetRelativeTime(notif?.createdAt)}
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              );
            })
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="m-0 bg-slate-100" />

        <Link
          href={`/dashboard/${role}/notifications`}
          className="hover:text-primary text-text-secondary flex items-center justify-center gap-1 p-2.5 text-xs font-semibold transition-colors"
        >
          View all notifications
          <ChevronRight size={14} />
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
