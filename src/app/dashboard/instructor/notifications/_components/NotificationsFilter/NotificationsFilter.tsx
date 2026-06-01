/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

interface NotificationsFilterProps {
  filter: string;
  setFilter: (f: 'all' | 'unread') => void;
  unreadCount: number;
  notifications: any[];
}

const NotificationsFilter = ({
  filter,
  setFilter,
  unreadCount,
  notifications,
}: NotificationsFilterProps) => {
  return (
    <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
      {[
        { key: 'all', label: `All (${notifications.length})` },
        { key: 'unread', label: `Unread (${unreadCount})` },
      ].map((tab) => (
        <button
          key={tab.key}
          onClick={() => setFilter(tab.key as 'all' | 'unread')}
          className={`px-5 py-2.5 text-sm font-semibold transition-all ${filter === tab.key ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NotificationsFilter;
