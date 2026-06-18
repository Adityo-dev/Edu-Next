'use client';

import { useState } from 'react';
import LiveSessionsHeader from './_components/LiveSessionsHeader/LiveSessionsHeader';
import LiveSessionsStats from './_components/LiveSessionsStats/LiveSessionsStats';
import LiveSessionsFilter from './_components/LiveSessionsFilter/LiveSessionsFilter';
import LiveSessionsList from './_components/LiveSessionsList/LiveSessionsList';

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

const LiveSessionsPage = () => {
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');

  const filtered = liveSessions.filter((s) => filter === 'all' || s.status === filter);

  const liveCount = liveSessions.filter((s) => s.status === 'live').length;
  const upcomingCount = liveSessions.filter((s) => s.status === 'upcoming').length;
  const completedCount = liveSessions.filter((s) => s.status === 'completed').length;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <LiveSessionsHeader />

        {/* Stats */}
        <LiveSessionsStats
          liveCount={liveCount}
          upcomingCount={upcomingCount}
          completedCount={completedCount}
        />

        {/* Filter */}
        <LiveSessionsFilter filter={filter} setFilter={setFilter} />

        {/* Sessions List */}
        <LiveSessionsList sessions={filtered} />
      </div>
    </div>
  );
};

export default LiveSessionsPage;
