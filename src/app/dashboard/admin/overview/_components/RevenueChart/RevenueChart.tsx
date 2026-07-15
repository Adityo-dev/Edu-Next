/* eslint-disable react-hooks/purity */
'use client';

import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { useGetAdminRevenueOverviewQuery } from '@/redux/features/payment/paymentApi';

const chartConfig = {
  totalRevenue: {
    label: 'Total Revenue',
    color: '#34796f',
  },
  instructorEarning: {
    label: 'Instructor Earning',
    color: '#3b82f6',
  },
  commission: {
    label: 'Commission',
    color: '#eab308',
  },
} satisfies ChartConfig;

const RevenueChart = () => {
  const { data, isLoading } = useGetAdminRevenueOverviewQuery();
  const overview = data?.data;

  const monthlyRevenue = overview?.chartData ?? [];
  const summary = overview?.summary;

  const revenueBreakdown = [
    {
      label: 'Total Revenue',
      value: `৳${summary?.totalRevenue?.toLocaleString() ?? 0}`,
      color: 'text-primary',
    },
    {
      label: 'Commission',
      value: `৳${summary?.totalCommission?.toLocaleString() ?? 0}`,
      color: 'text-secondary',
    },
    {
      label: 'Instructor Earnings',
      value: `৳${summary?.totalInstructorEarnings?.toLocaleString() ?? 0}`,
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="dashboard-card-container h-fit lg:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Revenue Overview</h2>
        <DynamicBadge text="Last 6 Months" />
      </div>

      <div className="min-h-[300px] w-full sm:h-[350px]">
        {isLoading ? (
          <div className="flex h-full items-end justify-between gap-2 pb-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-full animate-pulse rounded-t-md bg-slate-100"
                style={{ height: `${Math.random() * 60 + 20}%` }}
              />
            ))}
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              accessibilityLayer
              data={monthlyRevenue}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              maxBarSize={40}
              barGap={4}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.4} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="text-text-secondary text-[10px]"
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="totalRevenue" fill="var(--color-totalRevenue)" radius={[4, 4, 0, 0]} />
              <Bar
                dataKey="instructorEarning"
                fill="var(--color-instructorEarning)"
                radius={[4, 4, 0, 0]}
              />
              <Bar dataKey="commission" fill="var(--color-commission)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        )}
      </div>

      <div className="border-primary/10 mt-5 grid grid-cols-3 gap-4 border-t pt-5">
        {revenueBreakdown.map((item, i) => (
          <div key={i} className="bg-primary/10 rounded-sm p-3 text-center">
            {isLoading ? (
              <div className="mx-auto mb-1 h-7 w-20 animate-pulse rounded bg-slate-200" />
            ) : (
              <p className={`text-lg font-black ${item.color}`}>{item.value}</p>
            )}
            <p className="text-text-secondary text-xs">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;
