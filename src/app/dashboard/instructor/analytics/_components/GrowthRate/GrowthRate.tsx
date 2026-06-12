import { TrendingUp } from 'lucide-react';

const GrowthRate = () => {
  return (
    <div className="dashboard-card-container">
      <h2 className="mb-5 text-lg font-semibold">Growth Rate</h2>
      <div className="space-y-4">
        {[
          { label: 'Revenue Growth', value: '+22%', trend: 'up', color: 'text-primary' },
          { label: 'Student Growth', value: '+18%', trend: 'up', color: 'text-blue-500' },
          { label: 'View Growth', value: '+31%', trend: 'up', color: 'text-purple-500' },
          { label: 'Rating Change', value: '+0.1', trend: 'up', color: 'text-yellow-500' },
        ].map((item, i) => (
          <div
            key={i}
            className="border-primary/20 flex items-center justify-between rounded-sm border px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className={item.color} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <span className={`text-sm font-black ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrowthRate;
