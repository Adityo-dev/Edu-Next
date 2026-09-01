/* eslint-disable react-hooks/purity */
import { Calendar, Clock, ExternalLink, Video } from 'lucide-react';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import DynamicUserAvatar from '@/components/shared/DynamicUserAvatar/DynamicUserAvatar';
import { IStudentLiveSession } from '@/types/liveSessions.types';
import CountdownTimer from './CountdownTimer';

interface LiveSessionCardProps {
  session: IStudentLiveSession;
  statusConfig: Record<string, { label: string; color: string }>;
}

const LiveSessionCard = ({ session, statusConfig }: LiveSessionCardProps) => {
  // Safely grab the config, defaulting to a gray fallback if status is missing/invalid
  const config = statusConfig?.[session?.status as string] || { label: 'Unknown', color: '#6b7280' };

  const isLive = session?.status === 'live';
  const isCompleted = session?.status === 'completed';
  const isUpcoming = session?.status === 'upcoming';

  const startDateTime = new Date(session?.startTime || Date.now());
  const dateFormatted = startDateTime.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timeFormatted = startDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const courseTitle = session?.course?.title || 'Unknown Course';
  const platform = session?.meetingPlatform || 'Zoom';
  const duration = `${session?.durationInMins || 0} Mins`;

  const instructorName = session?.instructor
    ? `${session?.instructor?.firstName || ''} ${session?.instructor?.lastName || ''}`.trim()
    : 'Unknown Instructor';

  return (
    <div className="dashboard-card-container">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Left */}
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <DynamicBadge text={config?.label || 'Unknown'} color={config?.color || '#6b7280'} />
            <DynamicBadge text={platform} color="#6b7280" />
          </div>

          <h3 className="mb-1 text-base font-semibold">{session?.title || 'Untitled Session'}</h3>
          <p className="text-text-secondary mb-3 text-sm">{courseTitle}</p>

          <div className="text-text-secondary flex flex-wrap items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <DynamicUserAvatar
                src={session?.instructor?.avatar}
                alt={instructorName}
                size={18}
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
              className="sm:h-10"
              href={session?.meetingLink || '#'}
              target="_blank"
              variant="danger"
            />
          )}

          {isUpcoming && session?.startTime && (
            <CountdownTimer targetDate={session.startTime} />
          )}

          {isCompleted && (
            <span className="rounded-sm border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-400">
              Session Ended
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveSessionCard;
