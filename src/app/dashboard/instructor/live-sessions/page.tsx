'use client';

import { useState } from 'react';
import LiveSessionsHeader from './_components/LiveSessionsHeader/LiveSessionsHeader';
import CreateSessionForm from './_components/CreateSessionForm/CreateSessionForm';
import LiveSessionsStats from './_components/LiveSessionsStats/LiveSessionsStats';
import LiveSessionsFilter from './_components/LiveSessionsFilter/LiveSessionsFilter';
import LiveSessionsList from './_components/LiveSessionsList/LiveSessionsList';

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
        <LiveSessionsHeader showCreate={showCreate} setShowCreate={setShowCreate} />

        {/* Create Form */}
        {showCreate && (
          <CreateSessionForm
            setShowCreate={setShowCreate}
            newSession={newSession}
            setNewSession={setNewSession}
          />
        )}

        {/* Stats */}
        <LiveSessionsStats sessionsData={sessionsData} />

        {/* Filter */}
        <LiveSessionsFilter filter={filter} setFilter={setFilter} />

        {/* Sessions */}
        <LiveSessionsList filtered={filtered} statusConfig={statusConfig} />
      </div>
    </div>
  );
};

export default InstructorLiveSessionsPage;
