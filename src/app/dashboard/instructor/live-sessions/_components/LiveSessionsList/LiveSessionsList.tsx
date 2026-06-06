/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { Calendar, Clock, ExternalLink, Trash2, Video } from 'lucide-react';

interface LiveSessionsListProps {
  filtered: any[];
  statusConfig: Record<string, { label: string; color: string; dot: string }>;
}

const LiveSessionsList = ({ filtered, statusConfig }: LiveSessionsListProps) => {
  return (
    <div className="space-y-4">
      {filtered.map((session) => {
        const config = statusConfig[session?.status];
        return (
          <div
            key={session?.id}
            className={`rounded-sm border bg-white p-5 shadow-xs ${session?.status === 'live' ? 'border-red-100' : 'border-slate-200 hover:border-emerald-100'}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <DynamicBadge
                    text={config.label}
                    color={
                      session?.status === 'upcoming'
                        ? '#e96600'
                        : session?.status === 'live'
                          ? '#dc3545'
                          : '#34796f'
                    }
                  />
                  <DynamicBadge text={session?.platform} color="#6b7280" />
                </div>
                <h3 className="mb-1 text-base font-bold">{session?.title}</h3>
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
                    {session?.students} students registered
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                {session?.status !== 'completed' && (
                  <DynamicActionButton
                    label={session?.status === 'live' ? 'Start Now' : 'Open Link'}
                    showIcon
                    icon={ExternalLink}
                    className="sm:h-10"
                    href={session?.link}
                    variant={session?.status === 'live' ? 'danger' : 'default'}
                  />
                )}
                {session?.status !== 'live' && (
                  <button className="text-danger border-danger/20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LiveSessionsList;
