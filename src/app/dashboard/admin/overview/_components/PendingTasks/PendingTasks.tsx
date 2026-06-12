import Link from 'next/link';

const pendingTasks = [
  {
    label: '3 Instructor Verifications Pending',
    url: '/dashboard/admin/instructors',
    color: 'bg-yellow-50 text-yellow-600 border-yellow-100',
  },
  {
    label: '5 Withdrawal Requests Pending',
    url: '/dashboard/admin/withdrawals',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    label: '8 Reviews Awaiting Moderation',
    url: '/dashboard/admin/reviews',
    color: 'bg-orange-50 text-secondary border-orange-100',
  },
  {
    label: '2 Support Tickets Open',
    url: '/dashboard/admin/support',
    color: 'bg-red-50 text-red-500 border-red-100',
  },
];

const PendingTasks = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {pendingTasks.map((task, i) => (
        <Link
          key={i}
          href={task.url}
          className={`flex items-center gap-3 rounded-sm border p-4 text-sm font-semibold transition-all hover:shadow-sm ${task.color}`}
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-current" />
          {task.label}
        </Link>
      ))}
    </div>
  );
};

export default PendingTasks;
