'use client';

import { Flame } from 'lucide-react';
import { useGetStudentWeeklyActivityQuery } from '@/redux/features/progress/studentProgress.api';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, Tooltip, XAxis, LabelList } from 'recharts';

const chartConfig = {
  hours: {
    label: 'Hours',
    color: '#34796f', // primary color
  },
} satisfies ChartConfig;

// Custom tooltip to show exact hours on hover
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex items-center gap-2 rounded-sm border border-slate-100 bg-white p-2 shadow-md backdrop-blur-md">
        <p className="text-[11px] font-semibold tracking-wider uppercase">
          {payload[0].payload.day}
        </p>
        <div className="flex items-center gap-2">
          <span className="bg-primary h-2 w-2 rounded-full" />
          <p className="text-secondary text-sm font-semibold">{payload[0].value}h</p>
        </div>
      </div>
    );
  }
  return null;
};

const WeeklyActivity = () => {
  const { data, isLoading } = useGetStudentWeeklyActivityQuery();
  const weeklyActivity = data?.data || [];

  return (
    <div className="dashboard-card-container">
      <h3 className="mb-5 text-base font-semibold">This Week</h3>

      {/* Weekly Bar Chart from Shadcn */}
      <div className="mb-5 h-[120px] w-full">
        {isLoading ? (
          <div className="flex h-full w-full items-end justify-between gap-2 px-2 pb-6">
            {[40, 70, 45, 90, 60, 30, 80].map((height, i) => (
              <div
                key={i}
                className="w-full animate-pulse rounded-t bg-slate-100"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              accessibilityLayer
              data={weeklyActivity}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
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
              <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} minPointSize={2}>
                <LabelList
                  dataKey="hours"
                  position="top"
                  className="fill-primary text-[10px] font-semibold"
                  formatter={(value: unknown) => (Number(value) > 0 ? `${value}h` : '')}
                  offset={5}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </div>

      <div className="mb-4 h-px bg-slate-100" />

      {/* Streak */}
      <div className="flex items-center justify-between rounded-sm bg-orange-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Flame size={20} className="text-secondary" />
          <span className="text-sm font-bold text-slate-700">Current Streak</span>
        </div>
        <span className="text-secondary text-xl font-black">{isLoading ? '-' : '7 days 🔥'}</span>
      </div>
    </div>
  );
};

export default WeeklyActivity;
