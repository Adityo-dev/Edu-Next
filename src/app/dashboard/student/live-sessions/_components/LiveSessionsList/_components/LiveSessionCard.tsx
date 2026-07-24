/* eslint-disable react-hooks/purity */
import { Calendar, Clock, ExternalLink, Video } from 'lucide-react';
import Image from 'next/image';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { IStudentLiveSession } from '@/types/liveSessions.types';

interface LiveSessionCardProps {
  session: IStudentLiveSession;
  statusConfig: Record<string, { label: string; color: string; dot?: string }>;
}

const LiveSessionCard = ({ session, statusConfig }: LiveSessionCardProps) => {
  const config = statusConfig[session.status];
  const isLive = session.status === 'live';
  const isCompleted = session.status === 'completed';
  const isUpcoming = session.status === 'upcoming';

  const startDateTime = new Date(session.startTime || Date.now());
  const dateFormatted = startDateTime.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timeFormatted = startDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const courseTitle = session.course?.title || 'Unknown Course';
  const platform = session.meetingPlatform || 'Zoom';
  const duration = `${session.durationInMins || 0} Mins`;

  const instructorName = session.instructor
    ? `${session.instructor.firstName} ${session.instructor.lastName}`
    : 'Unknown Instructor';
  const instructorImage = session.instructor?.avatar || 'https://i.pravatar.cc/150';

  return (
    <div className="dashboard-card-container">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Left */}
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${config.color}`}
            >
              {config.dot && <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />}
              {config.label}
            </span>
            <DynamicBadge text={platform} color="#6b7280" />
          </div>

          <h3 className="font-se semibold mb-1 text-base">{session.title}</h3>
          <p className="text-text-secondary mb-3 text-sm">{courseTitle}</p>

          <div className="text-text-secondary flex flex-wrap items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
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
        </div>

        {/* CTA */}
        <div className="flex shrink-0 items-center gap-2">
          {isLive && (
            <DynamicActionButton
              label="Join Now"
              showIcon
              icon={Video}
              className="sm:h-10"
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
              className="sm:h-10"
              href={session.meetingLink}
              target="_blank"
              variant="default"
            />
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
