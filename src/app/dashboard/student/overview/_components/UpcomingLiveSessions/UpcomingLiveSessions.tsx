'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import CountdownTimer from '@/app/dashboard/student/live-sessions/_components/LiveSessionsList/_components/CountdownTimer';
import UpcomingLiveSessionCardSkeleton from '@/components/dashboard/Skeletons/UpcomingLiveSessionCardSkeleton';
import { useGetStudentDashboardSessionsQuery } from '@/redux/features/liveSessionsManagement/studentLiveSession.api';
import { FormatDateTime } from '@/utils/formatDateTime';
import { ArrowRight, Calendar, Clock, Video, VideoOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

const statusConfig: Record<string, { label: string; color: string }> = {
  live: { label: 'Live Now', color: '#dc2626' },
  upcoming: { label: 'Upcoming', color: '#ea580c' },
  completed: { label: 'Completed', color: '#16a34a' },
};

const UpcomingLiveSessions = () => {
  const { data, isLoading, isFetching, isError, refetch } = useGetStudentDashboardSessionsQuery({
    status: 'all',
  });

  const displaySessions = useMemo(() => {
    const sessions = data?.data || [];

    const getPriority = (status: string) => {
      if (status === 'live') return 1;
      if (status === 'upcoming') return 2;
      if (status === 'completed') return 3;
      return 4;
    };

    return [...sessions]
      .sort((a, b) => {
        const pA = getPriority(a.status);
        const pB = getPriority(b.status);
        if (pA !== pB) return pA - pB;

        // If same status, sort by date
        const timeA = new Date(a.startTime).getTime();
        const timeB = new Date(b.startTime).getTime();

        // For completed, we want the most recently completed first (descending)
        if (a.status === 'completed') {
          return timeB - timeA;
        }

        // For live/upcoming, we want the closest first (ascending)
        return timeA - timeB;
      })
      .slice(0, 2);
  }, [data?.data]);

  return (
    <div className="dashboard-card-container">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">Live Sessions</h2>
        <Link
          href="/dashboard/student/live-sessions"
          className="text-primary flex items-center gap-1 text-sm font-semibold hover:underline"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="space-y-4">
        {isError ? (
          <ErrorState
            title="Failed to Load Sessions"
            message="We couldn't fetch your upcoming live sessions right now. Please try again."
            onRetry={refetch}
          />
        ) : isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2].map((i) => (
              <UpcomingLiveSessionCardSkeleton key={i} />
            ))}
          </div>
        ) : displaySessions.length === 0 ? (
          <EmptyState
            title="No Sessions Scheduled"
            icon={VideoOff}
            description="There are no live or upcoming sessions available at the moment. Please check back later when your instructors schedule new classes."
          />
        ) : (
          <div
            className={`space-y-4 transition-opacity duration-300 ${isFetching && !isLoading ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
          >
            {displaySessions.map((session) => {
              const isLive = session?.status === 'live';
              const isUpcoming = session?.status === 'upcoming';
              const isCompleted = session?.status === 'completed';
              const config = statusConfig[session?.status as string] || {
                label: 'Unknown',
                color: '#6b7280',
              };

              const formatted = FormatDateTime(session?.startTime);
              const [dateFormatted, timeFormatted] = formatted.split(', ');

              const courseTitle = session?.course?.title || 'Unknown Course';
              const platform = session?.meetingPlatform || 'Zoom';
              const duration = `${session?.durationInMins || 0} Mins`;

              const instructorName = session?.instructor
                ? `${session?.instructor?.firstName || ''} ${session?.instructor?.lastName || ''}`.trim()
                : 'Unknown Instructor';
              const instructorImage = session?.instructor?.avatar || 'https://i.pravatar.cc/150';

              return (
                <div key={session?._id} className="dashboard-card-container p-3">
                  <div className="flex flex-col gap-3">
                    {/* Top Area: Badges & Title */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <DynamicBadge
                          text={config?.label || 'Unknown'}
                          color={config?.color || '#6b7280'}
                        />
                        <DynamicBadge text={platform} color="#6b7280" />
                      </div>

                      <h3 className="mb-1 text-sm leading-snug font-semibold">
                        {session?.title || 'Untitled'}
                      </h3>
                      <p className="text-text-secondary line-clamp-1 text-xs">{courseTitle}</p>
                    </div>

                    {/* Meta Info */}
                    <div className="text-text-secondary flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Image
                          src={instructorImage}
                          alt={instructorName}
                          width={18}
                          height={18}
                          className="rounded-full"
                        />
                        {instructorName}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {dateFormatted} • {timeFormatted}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {duration}
                      </span>
                    </div>

                    {/* CTA Area */}
                    <div className="mt-1 flex items-center justify-start border-t border-slate-100 pt-3">
                      {isLive && (
                        <DynamicActionButton
                          label="Join Now"
                          showIcon
                          icon={Video}
                          className="h-9! w-full justify-center text-xs"
                          href={session?.meetingLink || '#'}
                          target="_blank"
                          variant="danger"
                        />
                      )}

                      {isUpcoming && session?.startTime && (
                        <div className="w-full">
                          <CountdownTimer targetDate={session.startTime} />
                        </div>
                      )}

                      {isCompleted && (
                        <div className="w-full">
                          <span className="inline-block rounded-sm border border-slate-200 px-4 py-2 text-[11px] font-semibold text-slate-400">
                            Session Ended
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingLiveSessions;
