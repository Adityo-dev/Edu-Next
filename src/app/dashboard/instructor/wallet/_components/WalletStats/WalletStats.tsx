import React from 'react';
import { ArrowUpRight, Clock, TrendingUp } from 'lucide-react';

interface WalletStatsProps {
  credits: number;
  debits: number;
}

const WalletStats = ({ credits, debits }: WalletStatsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {[
        {
          icon: <TrendingUp size={20} />,
          label: 'Total Earned',
          value: `৳${credits.toLocaleString()}`,
          color: 'bg-emerald-50 text-primary',
        },
        {
          icon: <ArrowUpRight size={20} />,
          label: 'Total Withdrawn',
          value: `৳${debits.toLocaleString()}`,
          color: 'bg-orange-50 text-secondary',
        },
        {
          icon: <Clock size={20} />,
          label: 'Pending Clearance',
          value: '৳0',
          color: 'bg-blue-50 text-blue-600',
        },
      ].map((stat, i) => (
        <div key={i} className="rounded-md border border-slate-100 bg-white p-5 shadow-xs">
          <div
            className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm ${stat.color}`}
          >
            {stat.icon}
          </div>
          <p className="text-text-primary text-2xl font-black">{stat.value}</p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default WalletStats;
