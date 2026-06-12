import { MessageSquare, ShieldCheck, Star, Wallet } from 'lucide-react';
import Link from 'next/link';

const actions = [
  {
    label: 'Verify Instructors',
    href: '/dashboard/admin/instructors',
    icon: <ShieldCheck size={15} />,
  },
  {
    label: 'Process Withdrawals',
    href: '/dashboard/admin/withdrawals',
    icon: <Wallet size={15} />,
  },
  {
    label: 'Moderate Reviews',
    href: '/dashboard/admin/reviews',
    icon: <Star size={15} />,
  },
  {
    label: 'Manage Support',
    href: '/dashboard/admin/support',
    icon: <MessageSquare size={15} />,
  },
];

const QuickActions = () => {
  return (
    <div className="dashboard-card-container">
      <h2 className="mb-4 text-lg font-bold">Quick Actions</h2>
      <div className="space-y-2">
        {actions.map((action, i) => (
          <Link
            key={i}
            href={action.href}
            className="bg-primary first:bg-primary flex items-center gap-3 rounded-sm px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#2a6159] [&:not(:first-child)]:border [&:not(:first-child)]:border-slate-200 [&:not(:first-child)]:bg-white [&:not(:first-child)]:text-slate-600 [&:not(:first-child)]:hover:bg-slate-50"
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
