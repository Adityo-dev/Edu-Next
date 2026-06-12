const monthlyRevenue = [
  { month: 'Nov', revenue: 28000 },
  { month: 'Dec', revenue: 42000 },
  { month: 'Jan', revenue: 35000 },
  { month: 'Feb', revenue: 58000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 72000 },
];

const maxRevenue = Math.max(...monthlyRevenue.map((d) => d.revenue));

const revenueBreakdown = [
  { label: 'Total Revenue', value: '৳2,48,500', color: 'text-primary' },
  { label: 'Commission (20%)', value: '৳49,700', color: 'text-secondary' },
  { label: 'Instructor Earnings', value: '৳1,98,800', color: 'text-blue-500' },
];

const RevenueChart = () => {
  return (
    <div className="dashboard-card-container lg:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold">Revenue Overview</h2>
        <span className="text-primary rounded-sm bg-emerald-50 px-3 py-1 text-xs font-bold">
          Last 6 Months
        </span>
      </div>
      <div className="flex items-end justify-between gap-3" style={{ height: '160px' }}>
        {monthlyRevenue.map((d) => (
          <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-text-secondary text-xs">৳{(d.revenue / 1000).toFixed(0)}k</span>
            <div
              className="w-full overflow-hidden rounded-sm bg-slate-100"
              style={{ height: '120px' }}
            >
              <div
                className="bg-primary w-full rounded-sm transition-all duration-700"
                style={{
                  height: `${(d.revenue / maxRevenue) * 100}%`,
                  marginTop: `${100 - (d.revenue / maxRevenue) * 100}%`,
                }}
              />
            </div>
            <span className="text-text-secondary text-xs">{d.month}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-4 border-t border-slate-100 pt-5">
        {revenueBreakdown.map((item, i) => (
          <div key={i} className="rounded-sm bg-slate-50 p-3 text-center">
            <p className={`text-lg font-black ${item.color}`}>{item.value}</p>
            <p className="text-text-secondary text-xs">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;
