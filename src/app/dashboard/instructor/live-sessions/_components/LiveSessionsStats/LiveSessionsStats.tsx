/* eslint-disable @typescript-eslint/no-explicit-any */

const LiveSessionsStats = ({ sessionsData }: { sessionsData: any[] }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[
        {
          label: 'Live Now',
          value: sessionsData.filter((s) => s.status === 'live').length,
          color: 'text-red-500',
        },
        {
          label: 'Upcoming',
          value: sessionsData.filter((s) => s.status === 'upcoming').length,
          color: 'text-blue-600',
        },
        {
          label: 'Completed',
          value: sessionsData.filter((s) => s.status === 'completed').length,
          color: 'text-primary',
        },
      ].map((stat, i) => (
        <div
          key={i}
          className="rounded-md border border-slate-100 bg-white p-5 text-center shadow-xs"
        >
          <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default LiveSessionsStats;
