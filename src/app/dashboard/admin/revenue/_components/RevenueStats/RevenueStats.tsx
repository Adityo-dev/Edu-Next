import { ArrowDownLeft, ArrowUpRight, CircleDollarSign, Users } from 'lucide-react';

const stats = [
  { icon: <CircleDollarSign size={20} />, label: 'Total Revenue', value: '৳2,48,500' },
  { icon: <ArrowDownLeft size={20} />, label: 'Platform Commission', value: '৳49,700' },
  { icon: <ArrowUpRight size={20} />, label: 'Instructor Earnings', value: '৳1,98,800' },
  { icon: <Users size={20} />, label: 'Total Transactions', value: '1,240' },
];

const RevenueStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="dashboard-card-container">
          <div className="text-primary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-50">
            {stat.icon}
          </div>
          <p className="text-text-primary text-2xl font-black">{stat.value}</p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default RevenueStats;
