'use client';

import { Flame } from 'lucide-react';

const weeklyActivity = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 1 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 0.5 },
  { day: 'Fri', hours: 2 },
  { day: 'Sat', hours: 4 },
  { day: 'Sun', hours: 1.5 },
];

const maxHours = Math.max(...weeklyActivity.map((d) => d.hours));

const WeeklyActivity = () => {
  return (
    <div className="dashboard-card-container">
      <h3 className="mb-5 text-base font-bold">This Week</h3>

      {/* Weekly Bar Chart */}
      <div className="mb-5 flex items-end justify-between gap-1.5">
        {weeklyActivity.map((day) => (
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
        <span className="text-secondary text-xl font-black">7 days 🔥</span>
      </div>
    </div>
  );
};

export default WeeklyActivity;
