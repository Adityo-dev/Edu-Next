'use client';

import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import { useGetStudentDashboardSessionsQuery } from '@/redux/features/liveSessionsManagement/studentLiveSession.api';
import { FormatDateTime } from '@/utils/formatDateTime';
import { ExternalLink, Video, VideoOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const UpcomingLiveSessions = () => {
  const { data, isLoading } = useGetStudentDashboardSessionsQuery({ status: 'all' });

  const sessions = data?.data || [];

  // Show up to 3 upcoming or live sessions
  const displaySessions = [...sessions]
    .filter((s) => s.status === 'live' || s.status === 'upcoming')
    .sort((a, b) => {
      if (a.status === 'live' && b.status !== 'live') return -1;
      if (a.status !== 'live' && b.status === 'live') return 1;
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    })
    .slice(0, 3);

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
          <div className="flex animate-pulse flex-col gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 rounded-sm bg-slate-100"></div>
            ))}
          </div>
        ) : displaySessions.length > 0 ? (
          displaySessions.map((session) => {
            const formatted = FormatDateTime(session.startTime);
            const [dateStr, timeStr] = formatted.split(', ');
            const isLive = session.status === 'live';

            return (
              <div
                key={session._id}
                className="rounded-sm border border-slate-100 p-4 transition-all hover:border-emerald-100"
              >
                {/* Date Badge */}
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      isLive
                        ? 'animate-pulse bg-red-50 text-red-600'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isLive ? 'Live Now' : `${dateStr} • ${timeStr}`}
                  </span>
                  <span className="rounded-sm bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                    {session.meetingPlatform}
                  </span>
                </div>

                <h4 className="mb-2 text-sm font-semibold">{session.title}</h4>

                <div className="mb-3 flex items-center gap-2">
                  <Image
                    src={session.instructor?.avatar || 'https://placehold.co/150x150/EEE/31343C'}
                    alt={`${session.instructor?.firstName || 'Unknown'} ${session.instructor?.lastName || ''}`}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="text-text-secondary text-xs">
                    {session.instructor?.firstName} {session.instructor?.lastName}
                  </span>
                </div>

                {isLive ? (
                  <Link
                    href={session.meetingLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary flex w-full items-center justify-center gap-2 rounded-sm py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#2a6159] active:scale-95"
                  >
                    <Video size={13} />
                    Join Now
                  </Link>
                ) : (
                  <Link
                    href={session.meetingLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-sm border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-50 active:scale-95"
                  >
                    <ExternalLink size={13} />
                    Add to Calendar
                  </Link>
                )}
              </div>
            );
          })
        ) : (
          <EmptyState
            title="No Upcoming Sessions"
            icon={VideoOff}
            description="There are no live or scheduled sessions at the moment."
          />
        )}
      </div>
    </div>
  );
};

export default UpcomingLiveSessions;
