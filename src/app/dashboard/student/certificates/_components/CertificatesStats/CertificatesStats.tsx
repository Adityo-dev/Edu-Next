'use client';

import { Award, Clock, Target } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';

interface CertificatesStatsProps {
  earnedCount: number;
  inProgressCount: number;
}

const CertificatesStats = ({ earnedCount, inProgressCount }: CertificatesStatsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatsCard label="Certificates Earned" value={earnedCount} icon={Award} iconColor="#34796f" />
      <StatsCard label="In Progress" value={inProgressCount} icon={Clock} iconColor="#3b82f6" />
      <StatsCard
        label="Overall Completion"
        value="50%"
        icon={Target}
        iconColor="#eab308"
        className="sm:col-span-2 lg:col-span-1"
      />
    </div>
  );
};

export default CertificatesStats;
