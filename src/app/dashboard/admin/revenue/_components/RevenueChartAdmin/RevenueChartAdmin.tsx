const monthlyRevenue = [
  { month: 'Nov', total: 28000, commission: 5600, instructor: 22400 },
  { month: 'Dec', total: 42000, commission: 8400, instructor: 33600 },
  { month: 'Jan', total: 35000, commission: 7000, instructor: 28000 },
  { month: 'Feb', total: 58000, commission: 11600, instructor: 46400 },
  { month: 'Mar', total: 48000, commission: 9600, instructor: 38400 },
  { month: 'Apr', total: 72000, commission: 14400, instructor: 57600 },
];

const maxRevenue = Math.max(...monthlyRevenue.map((d) => d.total));

const RevenueChartAdmin = () => {
  return (
    <div className="dashboard-card-container">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold">Monthly Revenue Breakdown</h2>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="bg-primary h-3 w-3 rounded-sm" /> Total
          </span>
          <span className="flex items-center gap-1.5">
            <span className="bg-secondary h-3 w-3 rounded-sm" /> Commission
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-blue-400" /> Instructor
          </span>
        </div>
      </div>
      <div className="flex items-end justify-between gap-4" style={{ height: '160px' }}>
        {monthlyRevenue.map((d) => (
          <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full items-end gap-0.5" style={{ height: '120px' }}>
              <div
                className="bg-primary flex-1 rounded-sm"
                style={{ height: `${(d.total / maxRevenue) * 100}%` }}
              />
              <div
                className="bg-secondary flex-1 rounded-sm"
                style={{ height: `${(d.commission / maxRevenue) * 100}%` }}
              />
              <div
                className="flex-1 rounded-sm bg-blue-400"
                style={{ height: `${(d.instructor / maxRevenue) * 100}%` }}
              />
            </div>
            <span className="text-text-secondary text-xs">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChartAdmin;
