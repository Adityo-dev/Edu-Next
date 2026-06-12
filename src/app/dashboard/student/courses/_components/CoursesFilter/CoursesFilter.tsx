/* eslint-disable no-unused-vars */
'use client';

import { Search, X } from 'lucide-react';

interface CoursesFilterProps {
  filter: 'all' | 'in-progress' | 'completed';
  setFilter: (value: 'all' | 'in-progress' | 'completed') => void;
  search: string;
  setSearch: (value: string) => void;
  totalCourses: number;
  totalInProgress: number;
  totalCompleted: number;
}

const CoursesFilter = ({
  filter,
  setFilter,
  search,
  setSearch,
  totalCourses,
  totalInProgress,
  totalCompleted,
}: CoursesFilterProps) => {
  const tabs = [
    { key: 'all' as const, label: `All (${totalCourses})` },
    { key: 'in-progress' as const, label: `In Progress (${totalInProgress})` },
    { key: 'completed' as const, label: `Completed (${totalCompleted})` },
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Filter Tabs */}
      <div className="flex overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2.5 text-sm font-semibold transition-all ${
              filter === tab.key ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="focus:border-primary w-full rounded-sm border border-slate-200 bg-white py-2.5 pr-10 pl-10 text-sm transition-all outline-none focus:ring-2 focus:ring-emerald-100 sm:w-64"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CoursesFilter;
