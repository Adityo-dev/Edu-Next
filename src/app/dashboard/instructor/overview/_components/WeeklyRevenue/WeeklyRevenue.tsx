/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CardTitle } from '@/components/ui/card';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from 'recharts';

const chartData = [
  { day: 'Mon', revenue: 3200 },
  { day: 'Tue', revenue: 1800 },
  { day: 'Wed', revenue: 4500 },
  { day: 'Thu', revenue: 2100 },
  { day: 'Fri', revenue: 5200 },
  { day: 'Sat', revenue: 6800 },
  { day: 'Sun', revenue: 3900 },
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
      <div className="flex items-center gap-2 rounded-sm border border-slate-100 bg-white p-2 shadow-md backdrop-blur-md">
        <p className="text-[11px] font-semibold tracking-wider uppercase">
          {payload[0].payload.day}day
        </p>
        <div className="flex items-center gap-2">
          <span className="bg-primary h-2 w-2 rounded-full" />
          <p className="text-secondary text-sm font-semibold">
            ৳{payload[0].value.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function WeeklyRevenue() {
  return (
    <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
      <div className="mb-5 flex flex-row items-center justify-between space-y-0 p-0">
        <CardTitle className="text-lg font-bold text-black">Weekly Revenue</CardTitle>
        <span className="text-primary text-sm font-bold">৳27,500 this week</span>
      </div>

      <div className="h-62.5 w-full p-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.4} />

            <XAxis
              dataKey="day"
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
    </div>
  );
}
