/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import RevenueOverviewSkeleton from '@/components/dashboard/Skeletons/RevenueOverviewSkeleton';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { useGetInstructorRevenueOverviewQuery } from '@/redux/features/courseManagement/instructorCourse.api';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

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

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="flex flex-col gap-1.5 rounded-sm border border-slate-100 bg-white/90 p-2.5 shadow-md backdrop-blur-md">
        <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          {data.month}
        </p>
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: chartConfig.revenue.color }}
          />
          <p className="text-text-primary text-sm font-semibold">
            ৳{data.revenue?.toLocaleString() || 0}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: chartConfig.students.color }}
          />
          <p className="text-text-secondary text-xs font-semibold">{data.students || 0} students</p>
        </div>
      </div>
    );
  }
  return null;
};

const RevenueOverview = () => {
  const { data: response, isLoading } = useGetInstructorRevenueOverviewQuery();
  const overviewData = response?.data;
  const monthlyData = overviewData?.chartData || [];

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
          {/* Area Chart with Gradients */}
          <div className="h-45 w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <AreaChart
                accessibilityLayer
                data={monthlyData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fillStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-students)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-students)" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.4} />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  className="text-text-secondary text-[10px]"
                />

                <YAxis yAxisId="left" orientation="left" hide />
                <YAxis yAxisId="right" orientation="right" hide />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: 'rgba(52, 121, 111, 0.2)',
                    strokeWidth: 2,
                    strokeDasharray: '4 4',
                  }}
                  animationDuration={200}
                />

                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={3}
                  fill="url(#fillRevenue)"
                  activeDot={{ r: 6 }}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="students"
                  stroke="var(--color-students)"
                  strokeWidth={3}
                  fill="url(#fillStudents)"
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ChartContainer>
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
};

export default RevenueOverview;
