/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCheck } from 'lucide-react';

interface NotificationsHeaderProps {
  unreadCount: number;
  notifications: any[];
  setNotifications: (n: any[]) => void;
}

const NotificationsHeader = ({
  unreadCount,
  notifications,
  setNotifications,
}: NotificationsHeaderProps) => {
  return (
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
        <p className="text-text-secondary mt-1 text-sm">
          Stay updated with your courses and earnings.
        </p>
      </div>
      {unreadCount > 0 && (
        <button
          onClick={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))}
          className="flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          <CheckCheck size={15} />
          Mark All Read
        </button>
      )}
    </div>
  );
};

export default NotificationsHeader;
