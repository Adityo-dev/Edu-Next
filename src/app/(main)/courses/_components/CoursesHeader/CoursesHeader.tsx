/* eslint-disable no-unused-vars */
import { Search, X } from 'lucide-react';

interface CoursesHeaderProps {
  search: string;
  setSearch: (val: string) => void;
}

export default function CoursesHeader({ search, setSearch }: CoursesHeaderProps) {
  return (
    <div className="bg-primary px-6 py-16 text-center">
      <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
        Explore All <span className="text-yellow-400">Courses</span>
      </h1>
      <p className="mx-auto mb-8 max-w-xl text-lg text-white/75">
        Learn from verified instructors, earn certificates, and build real skills — all in one
        place.
      </p>
      <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-sm bg-white p-2 shadow-sm">
        <Search size={17} className="ml-2 shrink-0 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses or instructors..."
          className="w-full bg-transparent text-sm outline-none"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="shrink-0 text-slate-400 hover:text-slate-600"
          >
            <X size={15} />
          </button>
        )}
        <button className="bg-secondary shrink-0 rounded-sm px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#d98c0a]">
          Search
        </button>
      </div>
    </div>
  );
}
