import { BookOpen, TrendingUp, Video, Wallet } from 'lucide-react';
import Link from 'next/link';

const QuickActions = () => {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs">
      <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
      <div className="space-y-2">
        {[
          {
            label: 'Create New Course',
            href: '/dashboard/instructor/courses/create',
            icon: <BookOpen size={16} />,
            color: 'bg-primary text-white hover:bg-[#2a6159]',
          },
          {
            label: 'Schedule Live Session',
            href: '/dashboard/instructor/live-sessions',
            icon: <Video size={16} />,
            color: 'border border-slate-200 text-slate-600 hover:bg-slate-50',
          },
          {
            label: 'Request Withdrawal',
            href: '/dashboard/instructor/withdrawal',
            icon: <Wallet size={16} />,
            color: 'border border-slate-200 text-slate-600 hover:bg-slate-50',
          },
          {
            label: 'View Analytics',
            href: '/dashboard/instructor/analytics',
            icon: <TrendingUp size={16} />,
            color: 'border border-slate-200 text-slate-600 hover:bg-slate-50',
          },
        ].map((action, i) => (
          <Link
            key={i}
            href={action.href}
            className={`flex items-center gap-3 rounded-sm px-4 py-3.5 text-sm font-semibold transition-all ${action.color}`}
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
