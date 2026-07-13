import { BadgePercent, CircleDollarSign, TrendingUp } from 'lucide-react';
import React from 'react';

interface CommissionStatProps {
  commission: number;
}

const CommissionStat = ({ commission }: CommissionStatProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {[
        {
          icon: <BadgePercent size={20} />,
          label: 'Current Rate',
          value: `${commission}%`,
          color: 'text-primary',
        },
        {
          icon: <CircleDollarSign size={20} />,
          label: 'Commission Earned',
          value: '৳49,700',
          color: 'text-secondary',
        },
        {
          icon: <TrendingUp size={20} />,
          label: 'Total Revenue',
          value: '৳2,48,500',
          color: 'text-blue-500',
        },
      ].map((stat, i) => (
        <div key={i} className="dashboard-card-container">
          <div className="text-primary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-50">
            {stat.icon}
          </div>
          <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default CommissionStat;
