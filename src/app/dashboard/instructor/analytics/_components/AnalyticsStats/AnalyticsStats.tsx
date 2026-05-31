import React from 'react';
import { CircleDollarSign, Eye, Star, Users } from 'lucide-react';

const AnalyticsStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {[
        {
          icon: <CircleDollarSign size={20} />,
          label: 'Total Revenue',
          value: '৳48,500',
          sub: '+৳6,300 this month',
        },
        {
          icon: <Users size={20} />,
          label: 'Total Students',
          value: '1,240',
          sub: '+104 this month',
        },
        {
          icon: <Eye size={20} />,
          label: 'Course Views',
          value: '8,400',
          sub: '+1,200 this month',
        },
        {
          icon: <Star size={20} />,
          label: 'Avg Rating',
          value: '4.8',
          sub: 'Based on 185 reviews',
        },
      ].map((stat, i) => (
        <div
          key={i}
          className="rounded-md border border-slate-100 bg-white p-5 shadow-xs transition-all hover:border-emerald-100"
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

export default AnalyticsStats;
