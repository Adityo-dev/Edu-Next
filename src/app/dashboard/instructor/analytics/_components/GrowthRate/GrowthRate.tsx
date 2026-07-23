'use client';

import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import GrowthRateSkeleton from '@/components/dashboard/Skeletons/GrowthRateSkeleton';
import { useGetInstructorAnalyticsGrowthQuery } from '@/redux/features/courseManagement/instructorCourse.api';
import { DollarSign, Eye, Star, TrendingDown, TrendingUp, Users } from 'lucide-react';

const GrowthRate = () => {
  const { data: response, isLoading } = useGetInstructorAnalyticsGrowthQuery();
  const growthData = response?.data;

  const getTrendData = (value: number = 0, isRating = false) => {
    const isPositive = value >= 0;
    const absoluteValue = Math.abs(value);
    const formattedValue = isRating ? absoluteValue.toFixed(1) : absoluteValue + '%';

    return {
      value: formattedValue,
      isPositive,
      TrendIcon: isPositive ? TrendingUp : TrendingDown,
      badgeColor: isPositive ? '#059669' : '#dc2626',
    };
  };

  const stats = [
    {
      label: 'Revenue Growth',
      BaseIcon: DollarSign,
      baseColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      ...getTrendData(growthData?.revenueGrowth),
    },
    {
      label: 'Student Growth',
      BaseIcon: Users,
      baseColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      ...getTrendData(growthData?.studentGrowth),
    },
    {
      label: 'View Growth',
      BaseIcon: Eye,
      baseColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      ...getTrendData(growthData?.viewGrowth),
    },
    {
      label: 'Rating Change',
      BaseIcon: Star,
      baseColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      ...getTrendData(growthData?.ratingChange, true),
    },
  ];

  return (
    <div className="dashboard-card-container h-fit">
      <h2 className="mb-5 text-lg font-semibold">Growth Rate</h2>
      <div className="space-y-3">
        {isLoading
          ? [...Array(4)].map((_, i) => <GrowthRateSkeleton key={i} />)
          : stats.map((item, i) => (
              <div key={i} className="dashboard-card-container flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${item.baseColor}`}
                  >
                    <item.BaseIcon size={16} className={item.iconColor} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-text-secondary text-xs">vs last month</span>
                  </div>
                </div>

                <DynamicBadge text={item.value} color={item.badgeColor} icon={item.TrendIcon} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default GrowthRate;
