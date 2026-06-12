'use client';

import { Award, BookOpen, Clock, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: <BookOpen size={22} />,
    label: 'Enrolled Courses',
    value: '6',
    sub: '+2 this month',
    trend: 'up',
  },
  {
    icon: <TrendingUp size={22} />,
    label: 'Completed',
    value: '3',
    sub: '50% completion rate',
    trend: 'up',
  },
  {
    icon: <Award size={22} />,
    label: 'Certificates',
    value: '3',
    sub: 'Download anytime',
    trend: 'up',
  },
  {
    icon: <Clock size={22} />,
    label: 'Hours Learned',
    value: '48h',
    sub: '4h this week',
    trend: 'up',
  },
];

const StudentStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="dashboard-card-container transition-all duration-300 hover:border-emerald-100 hover:shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="text-primary flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-50">
              {stat.icon}
            </div>
            <span className="text-success bg-success/10 rounded-full px-2 py-0.5 text-xs font-semibold">
              ↑
            </span>
          </div>
          <p className="text-text-primary text-2xl font-black">{stat.value}</p>
          <p className="text-text-secondary mt-0.5 text-sm font-medium">{stat.label}</p>
          <p className="text-text-secondary mt-1 text-xs">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default StudentStats;
