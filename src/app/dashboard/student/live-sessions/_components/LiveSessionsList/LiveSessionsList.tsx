'use client';

import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import LiveSessionCardSkeleton from '@/components/dashboard/Skeletons/LiveSessionCardSkeleton';
import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import { useGetStudentDashboardSessionsQuery } from '@/redux/features/liveSessionsManagement/studentLiveSession.api';
import { ITableFilter } from '@/types/table-filter.types';
import { VideoOff } from 'lucide-react';
import { useMemo } from 'react';
import LiveSessionCard from './_components/LiveSessionCard';

const statusConfig: Record<string, { label: string; color: string }> = {
  live: { label: 'Live Now', color: '#dc2626' },
  upcoming: { label: 'Upcoming', color: '#ea580c' },
  completed: { label: 'Completed', color: '#16a34a' },
};

const SessionFilters: ITableFilter[] = [
  {
    type: 'tabs',
    name: 'status',
    placeholder: 'Status',
    options: [
      { label: 'All Sessions', value: 'all' },
      { label: 'Live Now', value: 'live' },
      { label: 'Upcoming', value: 'upcoming' },
      { label: 'Completed', value: 'completed' },
    ],
  },
  {
    type: 'search',
    name: 'search',
    placeholder: 'Search sessions or courses...',
  },
];

const LiveSessionsList = () => {
  const { getQueryObject } = useSetSearchQueryInURL();

  const queryParams = getQueryObject();
  const currentStatus = (queryParams.status as 'all' | 'live' | 'upcoming' | 'completed') || 'all';
  const currentSearchUrl = queryParams.search || '';

  const { data, isLoading, isError, isFetching, refetch } = useGetStudentDashboardSessionsQuery({
    status: currentStatus === 'all' ? undefined : currentStatus,
  });

  const rows = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  const filteredRows = useMemo(() => {
    if (!currentSearchUrl) return rows;
    return rows.filter(
      (row) =>
        row?.title?.toLowerCase()?.includes(currentSearchUrl.toLowerCase()) ||
        row?.course?.title?.toLowerCase()?.includes(currentSearchUrl.toLowerCase()),
    );
  }, [rows, currentSearchUrl]);

  return (
    <div className="space-y-6">
      <div className="dashboard-card-container space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Scheduled Sessions</h2>
        </div>
        <DynamicTableFilterBar fields={SessionFilters} />
      </div>

      {isError ? (
        <ErrorState
          title="Failed to load live sessions"
          message="Something went wrong while fetching your scheduled live sessions. Please try again."
          onRetry={refetch}
        />
      ) : isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <LiveSessionCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredRows.length === 0 ? (
        <div className="dashboard-card-container p-6">
          <EmptyState
            title="No Sessions Scheduled"
            icon={VideoOff}
            description="There are no live or upcoming sessions available at the moment. Please check back later when your instructors schedule new classes."
          />
        </div>
      ) : (
        <div
          className={`space-y-4 transition-opacity duration-300 ${isFetching && !isLoading ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
        >
          {filteredRows.map((session, i) => (
            <LiveSessionCard
              key={session?._id || `session-${i}`}
              session={session}
              statusConfig={statusConfig}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveSessionsList;
