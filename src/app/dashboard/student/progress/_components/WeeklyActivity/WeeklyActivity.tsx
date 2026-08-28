/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { useGetStudentWeeklyActivityQuery } from '@/redux/features/progress/studentProgress.api';
import { Flame } from 'lucide-react';
import { Bar, BarChart, LabelList, Tooltip, XAxis } from 'recharts';
import { useMemo } from 'react';

const chartConfig = {
  hours: {
    label: 'Hours',
    color: '#34796f',
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex items-center gap-2 rounded-sm border border-slate-100 bg-white p-2 shadow-md backdrop-blur-md">
        <p className="text-[11px] font-semibold tracking-wider uppercase">
          {payload[0].payload.day}
        </p>
        <div className="flex items-center gap-2">
          <span className="bg-primary h-2 w-2 rounded-full" />
          <p className="text-secondary text-sm font-semibold">{payload[0].payload.timeText}</p>
        </div>
      </div>
    );
  }
  return null;
};

const WeeklyActivity = () => {
  const { data, isLoading } = useGetStudentWeeklyActivityQuery();
  const weeklyActivity = useMemo(() => data?.data || [], [data?.data]);
  const currentStreak = data?.currentStreak || 0;

  return (
    <div className="dashboard-card-container">
      <h3 className="mb-5 text-base font-semibold">This Week</h3>

      {/* Weekly Bar Chart from Shadcn */}
      <div className="mb-5 h-37.5 w-full">
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
              margin={{ top: 25, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="text-text-secondary text-xs"
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(52, 121, 111, 0.04)', radius: 4 }}
                animationDuration={200}
              />
              <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} minPointSize={2}>
                <LabelList
                  dataKey="timeText"
                  position="top"
                  className="fill-primary text-xs font-semibold"
                  formatter={(value: unknown) => {
                    const str = String(value);
                    return str !== '0m' && str !== '0h' && str !== '0' ? str : '';
                  }}
                  offset={5}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </div>

      <div className="mb-4 h-px bg-slate-100" />

      {/* 7-Day Streak */}
      <div className="flex flex-col gap-3 rounded-sm bg-orange-50 p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">7-Day Streak</span>
          <span className="text-secondary text-sm font-semibold">
            {isLoading ? '-' : `${Math.min(currentStreak, 7)}/7`}
          </span>
        </div>
        <div className="flex items-center justify-between">
          {[...Array(7)].map((_, i) => {
            const isActive = i < currentStreak;
            // Dynamic colors from light orange to vibrant red-orange
            const activeColors = [
              'text-orange-300 fill-orange-300',
              'text-orange-400 fill-orange-400',
              'text-orange-500 fill-orange-500',
              'text-orange-500 fill-orange-500',
              'text-orange-600 fill-orange-600',
              'text-red-500 fill-red-500',
              'text-red-600 fill-red-600',
            ];
            const colorClass = isActive ? activeColors[i] : 'text-slate-200 fill-slate-200';

            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <Flame size={20} className={`transition-all duration-300 ${colorClass}`} />
                <span
                  className={`text-[10px] font-semibold ${isActive ? '' : 'text-text-placeholder'}`}
                >
                  Day {i + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivity;
