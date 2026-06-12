import { BadgePercent, BookOpen, CircleDollarSign, Users } from 'lucide-react';

const stats = [
  { icon: <Users size={20} />, label: 'Total Users', value: '5,240', sub: '+104 this month' },
  { icon: <BookOpen size={20} />, label: 'Total Courses', value: '124', sub: '+8 this month' },
  {
    icon: <CircleDollarSign size={20} />,
    label: 'Total Revenue',
    value: '৳2,48,500',
    sub: '+৳18,400 this month',
  },
  {
    icon: <BadgePercent size={20} />,
    label: 'Commission Earned',
    value: '৳49,700',
    sub: '20% of total',
  },
];

const AdminStats = () => {
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
          <p className="text-2xl font-black text-[#0f172a]">{stat.value}</p>
          <p className="text-sm font-semibold text-slate-600">{stat.label}</p>
          <p className="text-text-secondary mt-0.5 text-xs">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
