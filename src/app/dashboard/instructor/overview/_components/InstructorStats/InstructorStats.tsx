import { BookOpen, CircleDollarSign, Users, Wallet } from 'lucide-react';

const stats = [
  { icon: <BookOpen size={20} />, label: 'Total Courses', value: '8', sub: '+2 this month' },
  { icon: <Users size={20} />, label: 'Total Students', value: '1.2k', sub: '+48 this week' },
  {
    icon: <CircleDollarSign size={20} />,
    label: 'Total Revenue',
    value: '৳48,500',
    sub: 'After commission',
  },
  {
    icon: <Wallet size={20} />,
    label: 'Wallet Balance',
    value: '৳12,300',
    sub: 'Available to withdraw',
  },
];

const InstructorStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="rounded-md border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-emerald-100 hover:shadow-sm"
        >
          <div className="text-primary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-50">
            {stat.icon}
          </div>
          <p className="text-2xl font-black">{stat.value}</p>
          <p className="text-text-secondary text-sm font-semibold">{stat.label}</p>
          <p className="text-text-secondary mt-0.5 text-xs">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default InstructorStats;
