'use client';

import { Award, Clock, Target } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import { useMemo } from 'react';

interface CertificatesStatsProps {
  earnedCount: number;
  inProgressCount: number;
}

const CertificatesStats = ({ earnedCount, inProgressCount }: CertificatesStatsProps) => {
  const stats = useMemo(
    () => [
      {
        icon: Award,
        label: 'Certificates Earned',
        value: earnedCount,
        sub: 'Total courses finished',
        iconColor: '#34796f',
      },
      {
        icon: Clock,
        label: 'In Progress',
        value: inProgressCount,
        sub: 'Currently learning',
        iconColor: '#3b82f6',
      },
      {
        icon: Target,
        label: 'Overall Completion',
        value: '50%',
        sub: 'Average progress',
        iconColor: '#eab308',
      },
    ],
    [earnedCount, inProgressCount],
  );

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          label={stat.label}
          value={stat.value}
          sub={stat.sub}
          icon={stat.icon}
          iconColor={stat.iconColor}
          className={index === 2 ? 'col-span-2 lg:col-span-1' : ''}
        />
      ))}
    </div>
  );
};

export default CertificatesStats;
