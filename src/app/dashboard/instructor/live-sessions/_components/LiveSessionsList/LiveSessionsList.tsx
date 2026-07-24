/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { VideoOff } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';

import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import {
  useGetInstructorDashboardSessionsQuery,
  useUpdateLiveSessionMutation,
} from '@/redux/features/liveSessionsManagement/instructorLiveSessionApi';

import { IInstructorLiveSession } from '@/types/liveSessions.types';
import { ITableFilter } from '@/types/table-filter.types';

import LiveSessionCardSkeleton from '@/components/dashboard/Skeletons/LiveSessionCardSkeleton';
import LiveSessionCard, { ILiveSessionRow } from './_components/LiveSessionCard';

const mapSessionToRow = (session: IInstructorLiveSession): ILiveSessionRow => {
  const startDateTime = new Date(session.startTime);

  return {
    id: session._id,
    title: session.title,
    course: session.course?.title || 'Unknown Course',
    platform: session.meetingPlatform || 'Zoom',
    link: session.meetingLink,
    date: startDateTime.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    time: startDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    duration: `${session.durationInMins} Mins`,
    students: session.totalUsersRegistered || 0,
    status: session.status,
  };
};

const LiveSessionsList = () => {
  const { getQueryObject } = useSetSearchQueryInURL();
  const [actingRowId, setActingRowId] = useState<string | null>(null);

  // 1. URL Query States
  const queryParams = getQueryObject();
  const currentStatus = (queryParams.status as 'all' | 'live' | 'upcoming' | 'completed') || 'all';
  const currentSearchUrl = queryParams.search || '';

  // 2. RTK Query Hooks
  const { data, isLoading, isError, refetch } = useGetInstructorDashboardSessionsQuery({
    status: currentStatus === 'all' ? undefined : currentStatus,
  });

  const [updateLiveSession] = useUpdateLiveSessionMutation();

  const rows: ILiveSessionRow[] = useMemo(() => {
    return (data?.data ?? []).map(mapSessionToRow);
  }, [data]);

  const filteredRows = useMemo(() => {
    if (!currentSearchUrl) return rows;
    return rows.filter(
      (row) =>
        row.title.toLowerCase().includes(currentSearchUrl.toLowerCase()) ||
        row.course.toLowerCase().includes(currentSearchUrl.toLowerCase()),
    );
  }, [rows, currentSearchUrl]);

  // End Session Handler
  const handleEndSession = async (row: ILiveSessionRow) => {
    const isLive = row.status === 'live';
    const actionText = isLive ? 'end' : 'cancel';

    const confirmed = window.confirm(
      `Are you sure you want to ${actionText} the session "${row.title}"?`,
    );
    if (!confirmed) return;

    try {
      setActingRowId(row.id);
      await updateLiveSession({ sessionId: row.id, payload: { status: 'completed' } }).unwrap();
      toast.success(`Session ${actionText}ed successfully.`);
    } catch (err: any) {
      toast.error(err?.data?.message || `Failed to ${actionText} session.`);
    } finally {
      setActingRowId(null);
    }
  };

  // Go Live Handler
  const handleGoLive = async (row: ILiveSessionRow) => {
    try {
      setActingRowId(row.id);
      await updateLiveSession({ sessionId: row.id, payload: { status: 'live' } }).unwrap();
      toast.success('Session is now live!');
      window.open(row.link, '_blank');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to start live session.');
    } finally {
      setActingRowId(null);
    }
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

  const statusConfig: Record<string, { label: string; color: string }> = {
    live: { label: 'Live Now', color: '#dc3545' },
    upcoming: { label: 'Upcoming', color: '#e96600' },
    completed: { label: 'Completed', color: '#34796f' },
  };

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
            <LiveSessionCard
              key={session?.id}
              session={session}
              actingRowId={actingRowId}
              onGoLive={handleGoLive}
              onEndSession={handleEndSession}
              statusConfig={statusConfig}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveSessionsList;
