/* eslint-disable no-unused-vars */
'use client';

interface InstructorsFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const InstructorsFilter = ({ filter, onFilterChange }: InstructorsFilterProps) => {
  return (
    <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
      {['all', 'pending', 'approved', 'rejected'].map((tab) => (
        <button
          key={tab}
          onClick={() => onFilterChange(tab)}
          className={`px-5 py-2.5 text-sm font-semibold capitalize transition-all ${filter === tab ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default InstructorsFilter;
