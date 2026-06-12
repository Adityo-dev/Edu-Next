'use client';

import { Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const liveSessions = [
  {
    id: 1,
    title: 'React Advanced Patterns',
    instructor: 'Md. Rafiqul Islam',
    instructorImage: 'https://i.pravatar.cc/150?u=rafiq',
    date: 'Today',
    time: '7:00 PM',
    platform: 'Zoom',
    course: 'Web Development',
  },
  {
    id: 2,
    title: 'Figma Component Library',
    instructor: 'Farhan Hossain',
    instructorImage: 'https://i.pravatar.cc/150?u=farhan',
    date: 'Tomorrow',
    time: '5:00 PM',
    platform: 'Google Meet',
    course: 'UI/UX Design',
  },
];

const UpcomingLiveSessions = () => {
  return (
    <div className="dashboard-card-container">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">Live Sessions</h2>
        <Link
          href="/dashboard/student/live-sessions"
          className="text-primary text-sm font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="space-y-4">
        {liveSessions.map((session) => (
          <div
            key={session.id}
            className="rounded-sm border border-slate-100 p-4 transition-all hover:border-emerald-100"
          >
            {/* Date Badge */}
            <div className="mb-3 flex items-center justify-between">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                  session.date === 'Today'
                    ? 'text-primary bg-emerald-50'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {session.date} • {session.time}
              </span>
              <span className="rounded-sm bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                {session.platform}
              </span>
            </div>

            <h4 className="mb-2 text-sm font-bold">{session.title}</h4>

            <div className="mb-3 flex items-center gap-2">
              <Image
                src={session.instructorImage}
                alt={session.instructor}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="text-text-secondary text-xs">{session.instructor}</span>
            </div>

            <button
              className={`flex w-full items-center justify-center gap-2 rounded-sm py-2.5 text-xs font-bold transition-all active:scale-95 ${
                session.date === 'Today'
                  ? 'bg-primary text-white hover:bg-[#2a6159]'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Video size={13} />
              {session.date === 'Today' ? 'Join Now' : 'Set Reminder'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingLiveSessions;
