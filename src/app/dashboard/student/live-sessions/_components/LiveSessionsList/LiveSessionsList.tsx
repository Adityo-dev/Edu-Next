'use client';

import { Calendar, Clock, ExternalLink, Video } from 'lucide-react';
import Image from 'next/image';

interface Session {
  id: number;
  title: string;
  course: string;
  instructor: string;
  instructorImage: string;
  date: string;
  time: string;
  duration: string;
  platform: string;
  link: string;
  status: string;
}

interface LiveSessionsListProps {
  sessions: Session[];
}

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  live: { label: 'Live Now', color: 'bg-red-50 text-red-500', dot: 'bg-red-500 animate-pulse' },
  upcoming: { label: 'Upcoming', color: 'bg-blue-50 text-blue-600', dot: 'bg-blue-500' },
  completed: { label: 'Completed', color: 'bg-emerald-50 text-primary', dot: 'bg-primary' },
};

const LiveSessionsList = ({ sessions }: LiveSessionsListProps) => {
  if (sessions.length === 0) {
    return (
      <div className="dashboard-card-container py-12 text-center text-slate-500">
        No live sessions found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => {
        const config = statusConfig[session.status];
        return (
          <div
            key={session.id}
            className={`dashboard-card-container transition-all ${
              session.status === 'live'
                ? 'border-red-100 shadow-red-50'
                : 'hover:border-emerald-100'
            }`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Left */}
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
                    <Image
                      src={session.instructorImage}
                      alt={session.instructor}
                      width={18}
                      height={18}
                      className="rounded-full"
                    />
                    {session.instructor}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {session.date} • {session.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {session.duration}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="shrink-0">
                {session.status === 'live' && (
                  <a
                    href={session.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-sm bg-red-500 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-red-600 active:scale-95"
                  >
                    <Video size={15} />
                    Join Now
                  </a>
                )}
                {session.status === 'upcoming' && (
                  <a
                    href={session.link}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-primary flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#2a6159] active:scale-95"
                  >
                    <ExternalLink size={15} />
                    Add to Calendar
                  </a>
                )}
                {session.status === 'completed' && (
                  <span className="rounded-sm border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-400">
                    Session Ended
                  </span>
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
