import { useGetInstructorLiveSessionStatsQuery } from '@/redux/features/liveSessionsManagement/instructorLiveSessionApi';

const LiveSessionsStats = () => {
  const { data, isLoading, isError } = useGetInstructorLiveSessionStatsQuery();
  console.log(data);

  return (
    <div className="grid grid-cols-3 gap-4">
      {[
        {
          label: 'Live Now',
          value: data?.data?.liveNow || 0,
          color: 'text-red-500',
        },
        {
          label: 'Upcoming',
          value: data?.data?.upcoming || 0,
          color: 'text-blue-600',
        },
        {
          label: 'Completed',
          value: data?.data?.completed || 0,
          color: 'text-primary',
        },
      ].map((stat, i) => (
        <div key={i} className="dashboard-card-container text-center">
          {isError ? (
            <p className="text-text-secondary text-2xl font-black">—</p>
          ) : isLoading ? (
            <div className="mx-auto h-8 w-10 animate-pulse rounded bg-slate-100" />
          ) : (
            <p className={`text-primary text-3xl font-black ${stat.color}`}>{stat.value ?? 0}</p>
          )}

          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default LiveSessionsStats;
