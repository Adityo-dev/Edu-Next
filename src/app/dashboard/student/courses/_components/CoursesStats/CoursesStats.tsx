'use client';

import { Award, BookOpen, Play, Star } from 'lucide-react';

interface CoursesStatsProps {
  totalCourses: number;
  totalInProgress: number;
  totalCompleted: number;
  totalCertificates: number;
}

const CoursesStats = ({
  totalCourses,
  totalInProgress,
  totalCompleted,
  totalCertificates,
}: CoursesStatsProps) => {
  const stats = [
    {
      label: 'Total Enrolled',
      value: totalCourses,
      icon: <BookOpen size={18} />,
      color: 'bg-emerald-50 text-primary',
    },
    {
      label: 'In Progress',
      value: totalInProgress,
      icon: <Play size={18} />,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Completed',
      value: totalCompleted,
      icon: <Star size={18} />,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      label: 'Certificates',
      value: totalCertificates,
      icon: <Award size={18} />,
      color: 'bg-orange-50 text-secondary',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="dashboard-card-container">
          <div
            className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-sm ${stat.color}`}
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

export default CoursesStats;
