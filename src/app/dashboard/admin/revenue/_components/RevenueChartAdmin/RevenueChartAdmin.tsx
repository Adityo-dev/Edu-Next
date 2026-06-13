/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from 'recharts';

const monthlyRevenue = [
  { month: 'Nov', total: 28000, commission: 5600, instructor: 22400 },
  { month: 'Dec', total: 42000, commission: 8400, instructor: 33600 },
  { month: 'Jan', total: 35000, commission: 7000, instructor: 28000 },
  { month: 'Feb', total: 58000, commission: 11600, instructor: 46400 },
  { month: 'Mar', total: 48000, commission: 9600, instructor: 38400 },
  { month: 'Apr', total: 72000, commission: 14400, instructor: 57600 },
];

const chartConfig = {
  total: {
    label: 'Total',
    color: '#34796f',
  },
  commission: {
    label: 'Commission',
    color: '#e96600',
  },
  instructor: {
    label: 'Instructor',
    color: '#60a5fa', // blue-400
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 rounded-sm border border-slate-100 bg-white/95 p-3 shadow-md backdrop-blur-md">
        <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          {payload[0].payload.month}
        </p>
        <div className="flex flex-col gap-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-text-secondary text-xs capitalize">{entry.name}</span>
              </div>
              <span className="text-sm font-semibold">৳{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const RevenueChartAdmin = () => {
  return (
    <div className="dashboard-card-container">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Monthly Revenue Breakdown</h2>
        <div className="flex items-center gap-4 text-xs font-semibold">
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

      <div className="h-62.5 w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            accessibilityLayer
            data={monthlyRevenue}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barSize={50}
            barGap={5}
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
            <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="commission" fill="var(--color-commission)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="instructor" fill="var(--color-instructor)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default RevenueChartAdmin;
