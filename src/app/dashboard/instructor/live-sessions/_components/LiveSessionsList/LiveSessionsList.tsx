/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Calendar, Clock, ExternalLink, Trash2, Video, VideoOff } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import TableSkeleton from '@/components/dashboard/Skeletons/TableSkeleton';

import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import {
  useGetInstructorDashboardSessionsQuery,
  useUpdateLiveSessionMutation,
} from '@/redux/features/liveSessionsManagement/instructorLiveSessionApi';

import { IInstructorLiveSession } from '@/types/liveSessions.types';
import { ITableFilter } from '@/types/table-filter.types';

interface ILiveSessionRow {
  id: string;
  title: string;
  course: string;
  platform: string;
  link: string;
  date: string;
  time: string;
  duration: string;
  students: number;
  status: 'live' | 'upcoming' | 'completed';
}

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

  const handleDeleteSession = async (row: ILiveSessionRow) => {
    const confirmed = window.confirm(`Are you sure you want to cancel the session "${row.title}"?`);
    if (!confirmed) return;

    try {
      setActingRowId(row.id);
      await updateLiveSession({ sessionId: row.id, payload: { status: 'completed' } }).unwrap();
      toast.success('Session closed successfully.');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to complete session.');
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
        <TableSkeleton />
      ) : filteredRows.length === 0 ? (
        <EmptyState
          title="No Sessions Found"
          icon={VideoOff}
          description="There are no live or scheduled sessions matching the selected criteria."
        />
      ) : (
        <div className="space-y-4">
          {filteredRows.map((session) => {
            const config = statusConfig[session.status] || {
              label: session.status,
              color: '#64748b',
            };
            const isLive = session.status === 'live';
            const isCompleted = session.status === 'completed';

            return (
              <div
                key={session.id}
                className={`rounded-sm border bg-white p-5 shadow-xs transition-colors duration-200 ${
                  isLive
                    ? 'border-red-100 bg-red-50/10'
                    : 'border-slate-200 hover:border-emerald-100'
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <DynamicBadge text={config.label} color={config.color} />
                      <DynamicBadge text={session.platform} color="#6b7280" />
                    </div>
                    <h3 className="mb-1 text-base font-bold text-gray-900">{session.title}</h3>
                    <p className="text-text-secondary mb-3 text-sm">{session.course}</p>

                    <div className="text-text-secondary flex flex-wrap items-center gap-4 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {session.date} • {session.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {session.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Video size={12} />
                        {session.students.toLocaleString()} students registered
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {!isCompleted && (
                      <DynamicActionButton
                        label={isLive ? 'Start Now' : 'Open Link'}
                        showIcon
                        icon={ExternalLink}
                        className="sm:h-10"
                        href={session.link}
                        variant={isLive ? 'danger' : 'default'}
                      />
                    )}

                    {!isLive && (
                      <button
                        onClick={() => handleDeleteSession(session)}
                        disabled={actingRowId === session.id}
                        className="text-danger border-danger/20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border transition-colors hover:bg-red-50 disabled:opacity-50"
                        title="Cancel Session"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LiveSessionsList;
