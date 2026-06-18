/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
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
      <SectionHeader
        title={`Notifications`}
        description="Stay updated with your courses and earnings."
      />

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
