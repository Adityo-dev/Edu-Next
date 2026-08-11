'use client';

import { Flame } from 'lucide-react';
import { useGetStudentWeeklyActivityQuery } from '@/redux/features/progress/studentProgress.api';

const WeeklyActivity = () => {
  const { data, isLoading } = useGetStudentWeeklyActivityQuery();
  const weeklyActivity = data?.data || [
    { day: 'Mon', hours: 0 },
    { day: 'Tue', hours: 0 },
    { day: 'Wed', hours: 0 },
    { day: 'Thu', hours: 0 },
    { day: 'Fri', hours: 0 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 },
  ];

  const maxHours = Math.max(0.1, ...weeklyActivity.map((d) => d.hours));
  return (
    <div className="dashboard-card-container">
      <h3 className="mb-5 text-base font-bold">This Week</h3>

      {/* Weekly Bar Chart */}
      <div className="mb-5 flex items-end justify-between gap-1.5">
        {isLoading
          ? // Skeleton for chart
            [40, 70, 45, 90, 60, 30, 80].map((height, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-[10px] font-bold text-transparent">-</span>
                <div
                  className="w-full animate-pulse overflow-hidden rounded-sm bg-slate-100"
                  style={{ height: '60px' }}
                >
                  <div
                    className="w-full rounded-sm bg-slate-200"
                    style={{ height: `${height}%`, marginTop: `${100 - height}%` }}
                  />
                </div>
                <span className="text-[10px] text-transparent">-</span>
              </div>
            ))
          : weeklyActivity.map((day) => (
              <div key={day.day} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-primary text-[10px] font-bold">
                  {day.hours > 0 ? `${day.hours}h` : ''}
                </span>
                <div
                  className="w-full overflow-hidden rounded-sm bg-slate-100"
                  style={{ height: '60px' }}
                >
                  <div
                    className="bg-primary w-full rounded-sm transition-all duration-500"
                    style={{
                      height: `${(day.hours / maxHours) * 100}%`,
                      marginTop: `${100 - (day.hours / maxHours) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-text-secondary text-[10px]">{day.day}</span>
              </div>
            ))}
      </div>

      <div className="mb-4 h-px bg-slate-100" />

      {/* Streak */}
      <div className="flex items-center justify-between rounded-sm bg-orange-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Flame size={20} className="text-secondary" />
          <span className="text-sm font-bold text-slate-700">Current Streak</span>
        </div>
        <span className="text-secondary text-xl font-black">{isLoading ? '-' : '7 days 🔥'}</span>
        {/* Note: If the API returns streak data in the future, we can wire it up here */}
      </div>
    </div>
  );
};

export default WeeklyActivity;
