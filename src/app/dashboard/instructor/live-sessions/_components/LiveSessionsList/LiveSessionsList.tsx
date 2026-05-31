/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Clock, ExternalLink, Trash2, Video } from 'lucide-react';

interface LiveSessionsListProps {
  filtered: any[];
  statusConfig: Record<string, { label: string; color: string; dot: string }>;
}

const LiveSessionsList = ({ filtered, statusConfig }: LiveSessionsListProps) => {
  return (
    <div className="space-y-4">
      {filtered.map((session) => {
        const config = statusConfig[session.status];
        return (
          <div
            key={session.id}
            className={`rounded-md border bg-white p-5 shadow-xs ${session.status === 'live' ? 'border-red-100' : 'border-slate-100 hover:border-emerald-100'}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${config.color}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                    {config.label}
                  </span>
                  <span className="rounded-sm bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
                    {session.platform}
                  </span>
                </div>
                <h3 className="mb-1 text-base font-bold">{session.title}</h3>
                <p className="text-text-secondary mb-3 text-sm">{session.course}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
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
                    {session.students} students registered
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                {session.status !== 'completed' && (
                  <a
                    href={session.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-bold text-white transition-all ${session.status === 'live' ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-[#2a6159]'}`}
                  >
                    <ExternalLink size={14} />
                    {session.status === 'live' ? 'Start Now' : 'Open Link'}
                  </a>
                )}
                {session.status !== 'live' && (
                  <button className="flex h-10 w-10 items-center justify-center rounded-sm border border-red-100 text-red-400 hover:bg-red-50">
                    <Trash2 size={14} />
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
