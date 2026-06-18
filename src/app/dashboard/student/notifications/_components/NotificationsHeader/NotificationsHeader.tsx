'use client';

import { CheckCheck } from 'lucide-react';

interface NotificationsHeaderProps {
  unreadCount: number;
  markAllRead: () => void;
}

const NotificationsHeader = ({ unreadCount, markAllRead }: NotificationsHeaderProps) => {
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
          Stay updated with your learning activity.
        </p>
      </div>
      {unreadCount > 0 && (
        <button
          onClick={markAllRead}
          className="flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50"
        >
          <CheckCheck size={15} />
          Mark All Read
        </button>
      )}
    </div>
  );
};

export default NotificationsHeader;
