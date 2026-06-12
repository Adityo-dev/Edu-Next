'use client';

import { Award, BookOpen, Clock, Target } from 'lucide-react';

const stats = [
  {
    icon: <BookOpen size={20} />,
    label: 'Lessons Completed',
    value: '100',
    sub: 'out of 182 total',
  },
  { icon: <Clock size={20} />, label: 'Hours Learned', value: '48h', sub: '4h this week' },
  { icon: <Target size={20} />, label: 'Quiz Average', value: '87%', sub: '+5% from last month' },
  { icon: <Award size={20} />, label: 'Certificates', value: '3', sub: '3 more in progress' },
];

const ProgressStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="dashboard-card-container transition-all hover:border-emerald-100 hover:shadow-sm"
        >
          <div className="text-primary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-50">
            {stat.icon}
          </div>
          <p className="text-text-primary text-2xl font-black">{stat.value}</p>
          <p className="text-sm font-semibold text-slate-600">{stat.label}</p>
          <p className="text-text-secondary mt-0.5 text-xs">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default ProgressStats;
