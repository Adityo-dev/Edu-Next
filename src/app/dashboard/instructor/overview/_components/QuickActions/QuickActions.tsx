import React from 'react';
import Link from 'next/link';
import { BookOpen, TrendingUp, Video, Wallet } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
      <h2 className="mb-4 text-lg font-bold">Quick Actions</h2>
      <div className="space-y-2">
        {[
          {
            label: 'Create New Course',
            href: '/dashboard/instructor/courses/create',
            icon: <BookOpen size={15} />,
            color: 'bg-primary text-white hover:bg-[#2a6159]',
          },
          {
            label: 'Schedule Live Session',
            href: '/dashboard/instructor/live-sessions',
            icon: <Video size={15} />,
            color: 'border border-slate-200 text-slate-600 hover:bg-slate-50',
          },
          {
            label: 'Request Withdrawal',
            href: '/dashboard/instructor/withdrawal',
            icon: <Wallet size={15} />,
            color: 'border border-slate-200 text-slate-600 hover:bg-slate-50',
          },
          {
            label: 'View Analytics',
            href: '/dashboard/instructor/analytics',
            icon: <TrendingUp size={15} />,
            color: 'border border-slate-200 text-slate-600 hover:bg-slate-50',
          },
        ].map((action, i) => (
          <Link
            key={i}
            href={action.href}
            className={`flex items-center gap-3 rounded-sm px-4 py-3 text-sm font-semibold transition-all ${action.color}`}
          >
            {action.icon}
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
