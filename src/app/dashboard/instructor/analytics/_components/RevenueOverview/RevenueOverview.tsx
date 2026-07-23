/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import RevenueOverviewSkeleton from '@/components/dashboard/Skeletons/RevenueOverviewSkeleton';
import { ChartContainer, ChartTooltip, type ChartConfig } from '@/components/ui/chart';
import { useGetInstructorRevenueOverviewQuery } from '@/redux/features/courseManagement/instructorCourse.api';
import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: '#34796f',
  },
  students: {
    label: 'Students',
    color: '#f59e0b',
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="border-border bg-card rounded-md border p-4 shadow-xs">
        <div className="mb-3 flex items-center justify-between gap-6">
          <span className="text-primary font-semibold">{label}</span>
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
            <TrendingUp size={14} /> <span className="text-secondary-text">Trend</span>
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-secondary-text text-xs font-medium">Revenue</span>
              <span className="text-primary-text text-xl font-bold">
                ৳{Number(data.revenue).toLocaleString()}
              </span>
            </div>

            <div className="bg-border h-8 w-px"></div>

            <div className="flex flex-col">
              <span className="text-secondary-text text-xs font-medium">Students</span>
              <span className="text-primary-text text-xl font-bold">{data.students}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function RevenueOverview() {
  const { data: response, isLoading } = useGetInstructorRevenueOverviewQuery();
  const overviewData = response?.data;
  const chartData = overviewData?.chartData || [];

  return (
    <div className="dashboard-card-container flex flex-col lg:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Revenue Overview</h2>
        <DynamicBadge text="Last 6 Months" color="#34796f" />
      </div>

      {isLoading ? (
        <RevenueOverviewSkeleton />
      ) : (
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <header className="flex flex-row items-center justify-between pb-6">
              <div></div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#34796f]"></span>
                  <span className="text-secondary-text text-xs font-medium">Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]"></span>
                  <span className="text-secondary-text text-xs font-medium">Students</span>
                </div>
              </div>
            </header>
            <div>
              <ChartContainer config={chartConfig} className="h-80 w-full">
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: -20,
                    right: 12,
                    top: 10,
                    bottom: 10,
                  }}
                >
                  <defs>
                    <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="fillStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-students)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-students)" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    className="text-secondary-text text-xs"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    tickCount={6}
                    className="text-secondary-text text-xs"
                  />
                  <ChartTooltip cursor={false} content={<CustomTooltip />} />

                  <Area
                    dataKey="revenue"
                    type="linear"
                    fill="url(#fillRevenue)"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    activeDot={{ r: 6, fill: 'var(--color-revenue)', strokeWidth: 0 }}
                    dot={{ r: 4, fill: 'var(--color-revenue)', strokeWidth: 0 }}
                  />

                  <Area
                    dataKey="students"
                    type="linear"
                    fill="url(#fillStudents)"
                    stroke="var(--color-students)"
                    strokeWidth={2}
                    activeDot={{ r: 6, fill: 'var(--color-students)', strokeWidth: 0 }}
                    dot={{ r: 4, fill: 'var(--color-students)', strokeWidth: 0 }}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
            <div className="rounded-sm bg-emerald-50 p-4">
              <p className="text-text-secondary text-xs">Total Revenue</p>
              <p className="text-primary text-xl font-black">
                ৳{overviewData?.totalRevenue?.toLocaleString() || 0}
              </p>
            </div>
            <div className="rounded-sm bg-amber-50 p-4">
              <p className="text-text-secondary text-xs">Total Students</p>
              <p className="text-xl font-black text-amber-600">
                {overviewData?.totalStudents?.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
