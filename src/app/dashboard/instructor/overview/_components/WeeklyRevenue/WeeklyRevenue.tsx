import React from 'react';

const weeklyRevenue = [
  { day: 'Mon', amount: 3200 },
  { day: 'Tue', amount: 1800 },
  { day: 'Wed', amount: 4500 },
  { day: 'Thu', amount: 2100 },
  { day: 'Fri', amount: 5200 },
  { day: 'Sat', amount: 6800 },
  { day: 'Sun', amount: 3900 },
];

const maxAmount = Math.max(...weeklyRevenue.map((d) => d.amount));

const WeeklyRevenue = () => {
  return (
    <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">Weekly Revenue</h2>
        <span className="text-primary text-sm font-bold">৳27,500 this week</span>
      </div>
      <div className="flex items-end justify-between gap-2" style={{ height: '120px' }}>
        {weeklyRevenue.map((day) => (
          <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full overflow-hidden rounded-sm bg-slate-100"
              style={{ height: '90px' }}
            >
              <div
                className="bg-primary w-full rounded-sm transition-all duration-500"
                style={{
                  height: `${(day.amount / maxAmount) * 100}%`,
                  marginTop: `${100 - (day.amount / maxAmount) * 100}%`,
                }}
              />
            </div>
            <span className="text-text-secondary text-[10px]">{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyRevenue;
