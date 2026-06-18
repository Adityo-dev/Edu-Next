/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from 'recharts';

const monthlyRevenue = [
  { month: 'Nov', revenue: 28000 },
  { month: 'Dec', revenue: 42000 },
  { month: 'Jan', revenue: 35000 },
  { month: 'Feb', revenue: 58000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 72000 },
];

const revenueBreakdown = [
  { label: 'Total Revenue', value: '৳2,48,500', color: 'text-primary' },
  { label: 'Commission (20%)', value: '৳49,700', color: 'text-secondary' },
  { label: 'Instructor Earnings', value: '৳1,98,800', color: 'text-blue-500' },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: '#34796f',
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-1 rounded-sm border border-slate-100 bg-white/95 p-3 shadow-md backdrop-blur-md">
        <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          {payload[0].payload.month}
        </p>
        <div className="flex items-center gap-2">
          <span className="bg-primary h-2.5 w-2.5 rounded-full" />
          <p className="text-secondary text-sm font-bold">৳{payload[0].value.toLocaleString()}</p>
        </div>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  return (
    <div className="dashboard-card-container h-fit lg:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Revenue Overview</h2>
        <DynamicBadge text="Last 6 Months" />
      </div>

      <div className="h-62.5 w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            accessibilityLayer
            data={monthlyRevenue}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barSize={60}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.4} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="text-text-secondary text-[10px]"
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(52, 121, 111, 0.04)', radius: 4 }}
              animationDuration={200}
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>

      <div className="border-primary/10 mt-5 grid grid-cols-3 gap-4 border-t pt-5">
        {revenueBreakdown.map((item, i) => (
          <div key={i} className="bg-primary/10 rounded-sm p-3 text-center">
            <p className={`text-lg font-black ${item.color}`}>{item.value}</p>
            <p className="text-text-secondary text-xs">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;
