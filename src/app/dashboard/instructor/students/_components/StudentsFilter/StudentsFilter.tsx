/* eslint-disable no-unused-vars */
import { Search, X } from 'lucide-react';

interface StudentsFilterProps {
  courseFilter: string;
  setCourseFilter: (c: string) => void;
  search: string;
  setSearch: (s: string) => void;
  courses: string[];
}

const StudentsFilter = ({
  courseFilter,
  setCourseFilter,
  search,
  setSearch,
  courses,
}: StudentsFilterProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <select
        value={courseFilter}
        onChange={(e) => setCourseFilter(e.target.value)}
        className="focus:border-primary cursor-pointer rounded-sm border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-xs outline-none"
      >
        {courses.map((c) => (
          <option key={c} value={c}>
            {c === 'all' ? 'All Courses' : c}
          </option>
        ))}
      </select>
      <div className="relative">
        <Search size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search students..."
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

export default StudentsFilter;
