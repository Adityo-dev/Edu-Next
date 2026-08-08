'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useGetNotificationsQuery,
  notificationsApi,
} from '@/redux/features/notifications/notificationsApi';
import { INotification } from '@/types/notifications.types';
import { Bell, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { getSocket } from '@/lib/socket';
import { useCurrentUser } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { formatTimeAgo, getNotificationStyle } from '../../../../Notifications/Notifications';

export default function NotificationDropdown({ role }: { role: string }) {
  const { data } = useGetNotificationsQuery({ limit: 5 });
  const unreadCount = data?.data?.unreadCount || 0;
  const notifications = data?.data?.notifications || [];

  const dispatch = useDispatch();
  const user = useAppSelector(useCurrentUser);
  // Global Socket Listener for Real-time Notifications
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let socketInstance: any = null;
    let isMounted = true;

    const setupSocket = async () => {
      socketInstance = await getSocket();
      if (socketInstance && isMounted) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <button className="hover:text-primary relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 transition-all outline-none hover:border-emerald-100 hover:bg-emerald-50 active:scale-95">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="bg-secondary absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full border border-white px-1 text-[9px] font-bold text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80 rounded-md border border-slate-100 bg-white shadow-lg shadow-slate-100"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-black text-slate-800">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-primary rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold">
              {unreadCount} New
            </span>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="m-0 bg-slate-100" />

        <DropdownMenuGroup className="max-h-[350px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell size={24} className="mb-2 text-slate-200" />
              <p className="text-xs font-bold text-slate-400">No new notifications</p>
            </div>
          ) : (
            notifications.map((notif: INotification) => {
              const style = getNotificationStyle(notif.type);
              return (
                <DropdownMenuItem
                  key={notif._id}
                  asChild
                  className="cursor-pointer border-b border-slate-50 px-4 py-3 outline-none last:border-0 hover:bg-slate-50 focus:bg-slate-50"
                >
                  <Link
                    href={`/dashboard/${role}/notifications`}
                    className="flex items-start gap-3"
                  >
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm ${style.color}`}
                    >
                      {style.icon}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="mb-0.5 flex items-center gap-2">
                        <p className="truncate text-xs font-bold text-slate-800">{notif.title}</p>
                        {!notif.isRead && (
                          <span className="bg-secondary h-1.5 w-1.5 shrink-0 rounded-full" />
                        )}
                      </div>
                      <p className="text-text-secondary line-clamp-1 text-[11px] leading-relaxed">
                        {notif.message}
                      </p>
                      <p className="text-text-secondary mt-1 text-[10px]">
                        {formatTimeAgo(notif.createdAt)}
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
          className="hover:text-primary flex items-center justify-center gap-1 p-2.5 text-xs font-bold text-slate-500 transition-colors"
        >
          View all notifications
          <ChevronRight size={14} />
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
