/* eslint-disable no-unused-vars */

interface LiveSessionsFilterProps {
  filter: string;
  setFilter: (f: string) => void;
}

const LiveSessionsFilter = ({ filter, setFilter }: LiveSessionsFilterProps) => {
  return (
    <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
      {['all', 'live', 'upcoming', 'completed'].map((tab) => (
        <button
          key={tab}
          onClick={() => setFilter(tab)}
          className={`px-5 py-2.5 text-sm font-semibold capitalize transition-all ${filter === tab ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default LiveSessionsFilter;
