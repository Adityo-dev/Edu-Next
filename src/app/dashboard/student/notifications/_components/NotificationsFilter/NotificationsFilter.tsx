/* eslint-disable no-unused-vars */
'use client';

interface NotificationsFilterProps {
  filter: 'all' | 'unread';
  setFilter: (value: 'all' | 'unread') => void;
  totalCount: number;
  unreadCount: number;
}

const NotificationsFilter = ({
  filter,
  setFilter,
  totalCount,
  unreadCount,
}: NotificationsFilterProps) => {
  const tabs = [
    { key: 'all' as const, label: `All (${totalCount})` },
    { key: 'unread' as const, label: `Unread (${unreadCount})` },
  ];

  return (
    <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setFilter(tab.key)}
          className={`px-5 py-2.5 text-sm font-semibold transition-all ${
            filter === tab.key ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NotificationsFilter;
