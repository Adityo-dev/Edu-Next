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

const statusConfig: Record<string, { label: string; color: string; dot?: string }> = {
  live: { label: 'Live Now', color: '#dc3545', dot: 'bg-red-500 animate-pulse' },
  upcoming: { label: 'Upcoming', color: '#e96600', dot: 'bg-blue-500' },
  completed: { label: 'Completed', color: '#34796f', dot: 'bg-primary' },
};

const LiveSessionsList = () => {
  const { getQueryObject } = useSetSearchQueryInURL();

  const queryParams = getQueryObject();
  const currentStatus = (queryParams.status as 'all' | 'live' | 'upcoming' | 'completed') || 'all';
  const currentSearchUrl = queryParams.search || '';

  const { data, isLoading, isError, refetch } = useGetStudentDashboardSessionsQuery({
    status: currentStatus === 'all' ? undefined : currentStatus,
  });

  const rows = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  const filteredRows = useMemo(() => {
    if (!currentSearchUrl) return rows;
    return rows.filter(
      (row) =>
        row.title.toLowerCase().includes(currentSearchUrl.toLowerCase()) ||
        row.course?.title?.toLowerCase().includes(currentSearchUrl.toLowerCase()),
    );
  }, [rows, currentSearchUrl]);

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

  return (
    <div className="dashboard-card-container space-y-4 p-3">
      <DynamicTableFilterBar fields={SessionFilters} />

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
        <EmptyState
          title="No Sessions Found"
          icon={VideoOff}
          description="There are no live or scheduled sessions matching the selected criteria."
        />
      ) : (
        <div className="space-y-4">
          {filteredRows.map((session) => (
            <LiveSessionCard key={session._id} session={session} statusConfig={statusConfig} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveSessionsList;
