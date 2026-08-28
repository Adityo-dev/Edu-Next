'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import UpcomingLiveSessionCardSkeleton from '@/components/dashboard/Skeletons/UpcomingLiveSessionCardSkeleton';
import { useGetStudentDashboardSessionsQuery } from '@/redux/features/liveSessionsManagement/studentLiveSession.api';
import { FormatDateTime } from '@/utils/formatDateTime';
import { Calendar, Clock, ExternalLink, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

const statusConfig: Record<string, { label: string; color: string }> = {
  live: { label: 'Live Now', color: '#dc2626' },
  upcoming: { label: 'Upcoming', color: '#ea580c' },
};

const UpcomingLiveSessions = () => {
  const { data, isLoading } = useGetStudentDashboardSessionsQuery({ status: 'all' });

  // Show up to 3 upcoming or live sessions
  const displaySessions = useMemo(() => {
    const sessions = data?.data || [];
    return [...sessions]
      .filter((s) => s.status === 'live' || s.status === 'upcoming')
      .sort((a, b) => {
        if (a.status === 'live' && b.status !== 'live') return -1;
        if (a.status !== 'live' && b.status === 'live') return 1;
        return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
      })
      .slice(0, 3);
  }, [data?.data]);

  if (!isLoading && displaySessions.length === 0) {
    return null;
  }

  return (
    <div className="dashboard-card-container">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Live Sessions</h2>
        <Link
          href="/dashboard/student/live-sessions"
          className="text-primary text-sm font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2].map((i) => (
              <UpcomingLiveSessionCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          displaySessions.map((session) => {
            const isLive = session.status === 'live';
            const isUpcoming = session.status === 'upcoming';
            const config = isLive ? statusConfig.live : statusConfig.upcoming;

            const formatted = FormatDateTime(session.startTime);
            const [dateFormatted, timeFormatted] = formatted.split(', ');

            const courseTitle = session.course?.title || 'Unknown Course';
            const platform = session.meetingPlatform || 'Zoom';
            const duration = `${session.durationInMins || 0} Mins`;

            const instructorName = session.instructor
              ? `${session.instructor.firstName} ${session.instructor.lastName}`
              : 'Unknown Instructor';
            const instructorImage = session.instructor?.avatar || 'https://i.pravatar.cc/150';

            return (
              <div key={session._id} className="dashboard-card-container p-3">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <DynamicBadge text={config.label} color={config.color} />
                      <DynamicBadge text={platform} color="#6b7280" />
                    </div>

                    <h3 className="mb-1 text-sm font-semibold">{session.title}</h3>
                    <p className="text-text-secondary mb-3 text-xs">{courseTitle}</p>

                    <div className="text-text-secondary flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Image
                          src={instructorImage}
                          alt={instructorName}
                          width={20}
                          height={20}
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
                  </div>

                  {/* CTA */}
                  <div className="flex shrink-0 items-center gap-2">
                    {isLive && (
                      <DynamicActionButton
                        label="Join Now"
                        showIcon
                        icon={Video}
                        className="h-10! w-full justify-center sm:w-auto"
                        href={session.meetingLink}
                        target="_blank"
                        variant="danger"
                      />
                    )}

                    {isUpcoming && (
                      <DynamicActionButton
                        label="Add to Calendar"
                        showIcon
                        icon={ExternalLink}
                        className="h-10! w-full justify-center sm:w-auto"
                        href={session.meetingLink}
                        target="_blank"
                        variant="default"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UpcomingLiveSessions;
