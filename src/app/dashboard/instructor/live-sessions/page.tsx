'use client';

import { Calendar, Clock, ExternalLink, Plus, Trash2, Video } from 'lucide-react';
import { useState } from 'react';

const sessionsData = [
  {
    id: 1,
    title: 'React Advanced Patterns & Hooks',
    course: 'Complete Web Development Bootcamp',
    date: 'Today',
    time: '7:00 PM',
    duration: '90 min',
    platform: 'Zoom',
    link: 'https://zoom.us/j/123456',
    students: 45,
    status: 'live',
  },
  {
    id: 2,
    title: 'CSS Grid & Flexbox Deep Dive',
    course: 'Complete Web Development Bootcamp',
    date: 'May 25, 2025',
    time: '6:00 PM',
    duration: '60 min',
    platform: 'Zoom',
    link: 'https://zoom.us/j/654321',
    students: 38,
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Building REST API with Node.js',
    course: 'Node.js & Express API Development',
    date: 'May 28, 2025',
    time: '5:00 PM',
    duration: '75 min',
    platform: 'Google Meet',
    link: 'https://meet.google.com/abc-defg',
    students: 22,
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'JavaScript Async/Await',
    course: 'Complete Web Development Bootcamp',
    date: 'May 15, 2025',
    time: '7:00 PM',
    duration: '90 min',
    platform: 'Zoom',
    link: '#',
    students: 52,
    status: 'completed',
  },
];

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  live: { label: 'Live Now', color: 'bg-red-50 text-red-500', dot: 'bg-red-500 animate-pulse' },
  upcoming: { label: 'Upcoming', color: 'bg-blue-50 text-blue-600', dot: 'bg-blue-500' },
  completed: { label: 'Completed', color: 'bg-emerald-50 text-primary', dot: 'bg-primary' },
};

const InstructorLiveSessionsPage = () => {
  const [filter, setFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    course: '',
    date: '',
    time: '',
    duration: '',
    platform: 'Zoom',
    link: '',
  });

  const filtered = sessionsData.filter((s) => filter === 'all' || s.status === filter);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-text-primary text-2xl font-black">Live Sessions</h1>
            <p className="text-text-secondary mt-1 text-sm">
              Schedule and manage your live classes.
            </p>
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="bg-primary flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-bold text-white hover:bg-[#2a6159]"
          >
            <Plus size={16} />
            Schedule Session
          </button>
        </div>

        {/* Create Form */}
        {showCreate && (
          <div className="rounded-md border border-emerald-100 bg-white p-6 shadow-xs">
            <h2 className="mb-5 text-lg font-bold">Schedule New Session</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Session Title
                </label>
                <input
                  type="text"
                  value={newSession.title}
                  onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                  placeholder="e.g. React Hooks Deep Dive"
                  className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Course
                </label>
                <select className="focus:border-primary w-full cursor-pointer rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100">
                  <option>Complete Web Development Bootcamp</option>
                  <option>React.js Advanced Masterclass</option>
                  <option>Node.js & Express API Development</option>
                </select>
              </div>
              {[
                { label: 'Date', type: 'date', key: 'date' },
                { label: 'Time', type: 'time', key: 'time' },
                { label: 'Duration (minutes)', type: 'number', key: 'duration' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Platform
                </label>
                <select className="focus:border-primary w-full cursor-pointer rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100">
                  <option>Zoom</option>
                  <option>Google Meet</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Meeting Link
                </label>
                <input
                  type="url"
                  placeholder="https://zoom.us/j/..."
                  className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button className="bg-primary rounded-sm px-6 py-2.5 text-sm font-bold text-white hover:bg-[#2a6159]">
                Schedule Session
              </button>
              <button
                onClick={() => setShowCreate(false)}
                className="rounded-sm border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: 'Live Now',
              value: sessionsData.filter((s) => s.status === 'live').length,
              color: 'text-red-500',
            },
            {
              label: 'Upcoming',
              value: sessionsData.filter((s) => s.status === 'upcoming').length,
              color: 'text-blue-600',
            },
            {
              label: 'Completed',
              value: sessionsData.filter((s) => s.status === 'completed').length,
              color: 'text-primary',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-md border border-slate-100 bg-white p-5 text-center shadow-xs"
            >
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-text-secondary text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
          {['all', 'live', 'upcoming', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 text-sm font-semibold capitalize transition-all ${filter === tab ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sessions */}
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
      </div>
    </div>
  );
};

export default InstructorLiveSessionsPage;
