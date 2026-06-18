/* eslint-disable no-unused-vars */
'use client';

interface LiveSessionsFilterProps {
  filter: 'all' | 'live' | 'upcoming' | 'completed';
  setFilter: (value: 'all' | 'live' | 'upcoming' | 'completed') => void;
}

const LiveSessionsFilter = ({ filter, setFilter }: LiveSessionsFilterProps) => {
  const tabs = [
    { key: 'all' as const, label: 'All' },
    { key: 'live' as const, label: '🔴 Live Now' },
    { key: 'upcoming' as const, label: 'Upcoming' },
    { key: 'completed' as const, label: 'Completed' },
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

export default LiveSessionsFilter;
