/* eslint-disable no-unused-vars */
import { Search, X } from 'lucide-react';

interface CoursesFilterProps {
  filter: string;
  setFilter: (f: string) => void;
  search: string;
  setSearch: (s: string) => void;
}

const CoursesFilter = ({ filter, setFilter, search, setSearch }: CoursesFilterProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
        {['all', 'published', 'pending', 'draft'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2.5 text-sm font-semibold capitalize transition-all ${
              filter === tab ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="relative">
        <Search size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="focus:border-primary w-64 rounded-sm border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CoursesFilter;
