'use client';

import { Calendar, Clock, ExternalLink, Video } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const liveSessions = [
  {
    id: 1,
    title: 'React Advanced Patterns & Hooks',
    course: 'Complete Web Development Bootcamp',
    instructor: 'Md. Rafiqul Islam',
    instructorImage: 'https://i.pravatar.cc/150?u=rafiq',
    date: 'Today',
    time: '7:00 PM',
    duration: '90 min',
    platform: 'Zoom',
    link: 'https://zoom.us',
    status: 'live',
  },
  {
    id: 2,
    title: 'Figma Component Library Deep Dive',
    course: 'UI/UX Design Masterclass',
    instructor: 'Farhan Hossain',
    instructorImage: 'https://i.pravatar.cc/150?u=farhan',
    date: 'Tomorrow',
    time: '5:00 PM',
    duration: '60 min',
    platform: 'Google Meet',
    link: 'https://meet.google.com',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'SEO Strategy for Beginners',
    course: 'Digital Marketing from Zero to Hero',
    instructor: 'Nasrin Sultana',
    instructorImage: 'https://i.pravatar.cc/150?u=nasrin',
    date: 'May 25, 2025',
    time: '6:00 PM',
    duration: '75 min',
    platform: 'Zoom',
    link: 'https://zoom.us',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'JavaScript DOM Manipulation',
    course: 'Complete Web Development Bootcamp',
    instructor: 'Md. Rafiqul Islam',
    instructorImage: 'https://i.pravatar.cc/150?u=rafiq',
    date: 'May 20, 2025',
    time: '7:00 PM',
    duration: '90 min',
    platform: 'Zoom',
    link: '#',
    status: 'completed',
  },
  {
    id: 5,
    title: 'Freelancing Profile Optimization',
    course: 'Freelancing: From Beginner to Pro',
    instructor: 'Sabbir Hossain',
    instructorImage: 'https://i.pravatar.cc/150?u=sabbir',
    date: 'May 15, 2025',
    time: '5:00 PM',
    duration: '60 min',
    platform: 'Google Meet',
    link: '#',
    status: 'completed',
  },
];

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  live: { label: 'Live Now', color: 'bg-red-50 text-red-500', dot: 'bg-red-500 animate-pulse' },
  upcoming: { label: 'Upcoming', color: 'bg-blue-50 text-blue-600', dot: 'bg-blue-500' },
  completed: { label: 'Completed', color: 'bg-emerald-50 text-primary', dot: 'bg-primary' },
};

const LiveSessionsPage = () => {
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');

  const filtered = liveSessions.filter((s) => filter === 'all' || s.status === filter);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-text-primary text-2xl font-black">Live Sessions</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Join live classes from your enrolled courses.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: 'Live Now',
              value: liveSessions.filter((s) => s.status === 'live').length,
              color: 'bg-red-50 text-red-500',
            },
            {
              label: 'Upcoming',
              value: liveSessions.filter((s) => s.status === 'upcoming').length,
              color: 'bg-blue-50 text-blue-600',
            },
            {
              label: 'Attended',
              value: liveSessions.filter((s) => s.status === 'completed').length,
              color: 'bg-emerald-50 text-primary',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-md border border-slate-100 bg-white p-5 text-center shadow-xs"
            >
              <p className={`text-3xl font-black ${stat.color.split(' ')[1]}`}>{stat.value}</p>
              <p className="text-text-secondary mt-1 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
          {[
            { key: 'all', label: 'All' },
            { key: 'live', label: '🔴 Live Now' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`px-5 py-2.5 text-sm font-semibold transition-all ${
                filter === tab.key ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {filtered.map((session) => {
            const config = statusConfig[session.status];
            return (
              <div
                key={session.id}
                className={`rounded-md border bg-white p-5 shadow-xs transition-all ${
                  session.status === 'live'
                    ? 'border-red-100 shadow-red-50'
                    : 'border-slate-100 hover:border-emerald-100'
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
      </div>
    </div>
  );
};

export default LiveSessionsPage;
