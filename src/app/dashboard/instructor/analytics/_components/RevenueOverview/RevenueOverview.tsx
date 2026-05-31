import React from 'react';

const monthlyData = [
  { month: 'Nov', revenue: 8200, students: 42 },
  { month: 'Dec', revenue: 12400, students: 68 },
  { month: 'Jan', revenue: 9800, students: 51 },
  { month: 'Feb', revenue: 15600, students: 89 },
  { month: 'Mar', revenue: 11200, students: 63 },
  { month: 'Apr', revenue: 18500, students: 104 },
];

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

const RevenueOverview = () => {
  return (
    <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs lg:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold">Revenue Overview</h2>
        <span className="text-primary rounded-sm bg-emerald-50 px-3 py-1 text-xs font-bold">
          Last 6 Months
        </span>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between gap-3" style={{ height: '160px' }}>
        {monthlyData.map((d) => (
          <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-text-secondary text-xs font-medium">
              ৳{(d.revenue / 1000).toFixed(1)}k
            </span>
            <div
              className="group relative w-full overflow-hidden rounded-sm bg-slate-100"
              style={{ height: '120px' }}
            >
              <div
                className="bg-primary absolute bottom-0 w-full rounded-sm transition-all duration-700"
                style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
              />
            </div>
            <span className="text-text-secondary text-xs">{d.month}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
        <div className="rounded-sm bg-emerald-50 p-4">
          <p className="text-text-secondary text-xs">Total Revenue</p>
          <p className="text-primary text-xl font-black">
            ৳{monthlyData.reduce((a, b) => a + b.revenue, 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-sm bg-blue-50 p-4">
          <p className="text-text-secondary text-xs">Total Students</p>
          <p className="text-xl font-black text-blue-600">
            {monthlyData.reduce((a, b) => a + b.students, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
