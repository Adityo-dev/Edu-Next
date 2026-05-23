'use client';

import { CircleDollarSign, Eye, Star, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';

const monthlyData = [
  { month: 'Nov', revenue: 8200, students: 42 },
  { month: 'Dec', revenue: 12400, students: 68 },
  { month: 'Jan', revenue: 9800, students: 51 },
  { month: 'Feb', revenue: 15600, students: 89 },
  { month: 'Mar', revenue: 11200, students: 63 },
  { month: 'Apr', revenue: 18500, students: 104 },
];

const courseAnalytics = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    students: 320,
    revenue: 18000,
    views: 2400,
    rating: 4.9,
    completion: 68,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600',
  },
  {
    id: 2,
    title: 'React.js Advanced Masterclass',
    students: 210,
    revenue: 12600,
    views: 1800,
    rating: 4.8,
    completion: 55,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600',
  },
  {
    id: 3,
    title: 'JavaScript ES6+ Fundamentals',
    students: 180,
    revenue: 9000,
    views: 1200,
    rating: 4.7,
    completion: 72,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600',
  },
];

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

const InstructorAnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-text-primary text-2xl font-black">Analytics</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Track your course performance and earnings.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              icon: <CircleDollarSign size={20} />,
              label: 'Total Revenue',
              value: '৳48,500',
              sub: '+৳6,300 this month',
            },
            {
              icon: <Users size={20} />,
              label: 'Total Students',
              value: '1,240',
              sub: '+104 this month',
            },
            {
              icon: <Eye size={20} />,
              label: 'Course Views',
              value: '8,400',
              sub: '+1,200 this month',
            },
            {
              icon: <Star size={20} />,
              label: 'Avg Rating',
              value: '4.8',
              sub: 'Based on 185 reviews',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-md border border-slate-100 bg-white p-5 shadow-xs transition-all hover:border-emerald-100"
            >
              <div className="text-primary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-50">
                {stat.icon}
              </div>
              <p className="text-text-primary text-2xl font-black">{stat.value}</p>
              <p className="text-sm font-semibold text-slate-600">{stat.label}</p>
              <p className="text-text-secondary mt-0.5 text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Revenue Chart */}
          <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold">Revenue Overview</h2>
              <span className="text-primary rounded-sm bg-emerald-50 px-3 py-1 text-xs font-bold">
                Last 6 Months
              </span>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between gap-3" style={{ height: '160px' }}>
              {monthlyData.map((d) => (
                <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-text-secondary text-xs font-medium">
                    ৳{(d.revenue / 1000).toFixed(1)}k
                  </span>
                  <div
                    className="group relative w-full overflow-hidden rounded-sm bg-slate-100"
                    style={{ height: '120px' }}
                  >
                    <div
                      className="bg-primary absolute bottom-0 w-full rounded-sm transition-all duration-700"
                      style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                  <span className="text-text-secondary text-xs">{d.month}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
              <div className="rounded-sm bg-emerald-50 p-4">
                <p className="text-text-secondary text-xs">Total Revenue</p>
                <p className="text-primary text-xl font-black">
                  ৳{monthlyData.reduce((a, b) => a + b.revenue, 0).toLocaleString()}
                </p>
              </div>
              <div className="rounded-sm bg-blue-50 p-4">
                <p className="text-text-secondary text-xs">Total Students</p>
                <p className="text-xl font-black text-blue-600">
                  {monthlyData.reduce((a, b) => a + b.students, 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Top Course */}
          <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
            <h2 className="mb-5 text-lg font-bold">Growth Rate</h2>
            <div className="space-y-4">
              {[
                { label: 'Revenue Growth', value: '+22%', trend: 'up', color: 'text-primary' },
                { label: 'Student Growth', value: '+18%', trend: 'up', color: 'text-blue-500' },
                { label: 'View Growth', value: '+31%', trend: 'up', color: 'text-purple-500' },
                { label: 'Rating Change', value: '+0.1', trend: 'up', color: 'text-yellow-500' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-sm border border-slate-100 px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp size={15} className={item.color} />
                    <span className="text-sm font-medium text-slate-600">{item.label}</span>
                  </div>
                  <span className={`text-sm font-black ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Performance */}
        <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
          <h2 className="mb-5 text-lg font-bold">Course Performance</h2>
          <div className="space-y-4">
            {courseAnalytics.map((course) => (
              <div
                key={course.id}
                className="flex flex-col gap-4 rounded-sm border border-slate-100 p-4 transition-all hover:border-emerald-100 sm:flex-row sm:items-center"
              >
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm">
                  <Image src={course.image} alt={course.title} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-2 line-clamp-1 font-bold">{course.title}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 sm:grid-cols-4">
                    <span className="flex items-center gap-1">
                      <Users size={11} />
                      {course.students} students
                    </span>
                    <span className="flex items-center gap-1">
                      <CircleDollarSign size={11} />৳{course.revenue.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={11} />
                      {course.views.toLocaleString()} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={11} fill="#ffc107" color="#ffc107" />
                      {course.rating}
                    </span>
                  </div>
                </div>
                <div className="w-full sm:w-32">
                  <p className="text-text-secondary mb-1 text-xs">Completion Rate</p>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${course.completion}%` }}
                    />
                  </div>
                  <p className="text-primary mt-1 text-xs font-bold">{course.completion}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorAnalyticsPage;
