/* eslint-disable no-unused-vars */
import { Calendar, Clock, ExternalLink, StopCircle, Video, XCircle } from 'lucide-react';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';

export interface ILiveSessionRow {
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

interface LiveSessionCardProps {
  session: ILiveSessionRow;
  actingRowId: string | null;
  onGoLive: (session: ILiveSessionRow) => void;
  onEndSession: (session: ILiveSessionRow) => void;
  statusConfig: Record<string, { label: string; color: string }>;
}

const LiveSessionCard = ({
  session,
  actingRowId,
  onGoLive,
  onEndSession,
  statusConfig,
}: LiveSessionCardProps) => {
  const config = statusConfig[session?.status] || {
    label: session?.status,
    color: '#64748b',
  };
  const isLive = session?.status === 'live';
  const isCompleted = session?.status === 'completed';
  const isUpcoming = session?.status === 'upcoming';

  return (
    <div className="dashboard-card-container">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <DynamicBadge text={config.label} color={config.color} />
            <DynamicBadge text={session?.platform} color="#6b7280" />
          </div>
          <h3 className="font-se semibold mb-1 text-base">{session?.title}</h3>
          <p className="text-text-secondary mb-3 text-sm">{session?.course}</p>

          <div className="text-text-secondary flex flex-wrap items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {session?.date} • {session?.time}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {session?.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Video size={12} />
              {session?.students.toLocaleString()} students registered
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {isLive && (
            <DynamicActionButton
              label="Join Session"
              showIcon
              icon={ExternalLink}
              className="sm:h-10"
              href={session?.link}
              target="_blank"
              variant="danger"
            />
          )}

          {isUpcoming && (
            <DynamicActionButton
              label="Go Live Now"
              showIcon
              icon={Video}
              className="sm:h-10"
              onClick={() => onGoLive(session)}
              isLoading={actingRowId === session?.id}
              variant="default"
            />
          )}

          {!isCompleted && (
            <button
              onClick={() => onEndSession(session)}
              disabled={actingRowId === session?.id}
              className="text-danger border-danger/20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border transition-colors hover:bg-red-50 disabled:opacity-50"
              title={isLive ? 'End Session' : 'Cancel Session'}
            >
              {isLive ? <StopCircle size={16} /> : <XCircle size={16} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveSessionCard;
