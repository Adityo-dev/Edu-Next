'use client';

import {
  BadgePercent,
  BookOpen,
  CircleDollarSign,
  MessageSquare,
  ShieldCheck,
  Star,
  Users,
  Wallet,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { icon: <Users size={20} />, label: 'Total Users', value: '5,240', sub: '+104 this month' },
  { icon: <BookOpen size={20} />, label: 'Total Courses', value: '124', sub: '+8 this month' },
  {
    icon: <CircleDollarSign size={20} />,
    label: 'Total Revenue',
    value: '৳2,48,500',
    sub: '+৳18,400 this month',
  },
  {
    icon: <BadgePercent size={20} />,
    label: 'Commission Earned',
    value: '৳49,700',
    sub: '20% of total',
  },
];

const pendingTasks = [
  {
    label: '3 Instructor Verifications Pending',
    url: '/dashboard/admin/instructors',
    color: 'bg-yellow-50 text-yellow-600 border-yellow-100',
  },
  {
    label: '5 Withdrawal Requests Pending',
    url: '/dashboard/admin/withdrawals',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    label: '8 Reviews Awaiting Moderation',
    url: '/dashboard/admin/reviews',
    color: 'bg-orange-50 text-secondary border-orange-100',
  },
  {
    label: '2 Support Tickets Open',
    url: '/dashboard/admin/support',
    color: 'bg-red-50 text-red-500 border-red-100',
  },
];

const recentUsers = [
  {
    name: 'Sumaiya Akter',
    role: 'Student',
    date: '2 hours ago',
    image: 'https://i.pravatar.cc/150?u=sumaiya',
  },
  {
    name: 'Md. Rafiqul Islam',
    role: 'Instructor',
    date: 'Yesterday',
    image: 'https://i.pravatar.cc/150?u=rafiq',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Student',
    date: '2 days ago',
    image: 'https://i.pravatar.cc/150?u=nusrat',
  },
  {
    name: 'Farhan Hossain',
    role: 'Instructor',
    date: '3 days ago',
    image: 'https://i.pravatar.cc/150?u=farhan',
  },
];

const monthlyRevenue = [
  { month: 'Nov', revenue: 28000 },
  { month: 'Dec', revenue: 42000 },
  { month: 'Jan', revenue: 35000 },
  { month: 'Feb', revenue: 58000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 72000 },
];

const maxRevenue = Math.max(...monthlyRevenue.map((d) => d.revenue));

const AdminOverviewPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Banner */}
        <div className="bg-primary relative overflow-hidden rounded-md px-8 py-8">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 text-sm text-white/60">Super Admin</p>
              <h1 className="text-2xl font-black text-white md:text-3xl">EduNext Control Panel</h1>
              <p className="mt-2 text-sm text-white/60">
                <span className="font-bold text-white">18 actions</span> require your attention
                today.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="rounded-md border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
                <p className="text-2xl font-black text-white">5,240</p>
                <p className="text-xs text-white/60">Total Users</p>
              </div>
              <div className="rounded-md border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
                <p className="text-2xl font-black text-yellow-400">৳49.7k</p>
                <p className="text-xs text-white/60">Commission</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-md border border-slate-100 bg-white p-5 shadow-xs transition-all hover:border-emerald-100 hover:shadow-sm"
            >
              <div className="text-primary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-50">
                {stat.icon}
              </div>
              <p className="text-2xl font-black text-[#0f172a]">{stat.value}</p>
              <p className="text-sm font-semibold text-slate-600">{stat.label}</p>
              <p className="text-text-secondary mt-0.5 text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Pending Tasks */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pendingTasks.map((task, i) => (
            <Link
              key={i}
              href={task.url}
              className={`flex items-center gap-3 rounded-sm border p-4 text-sm font-semibold transition-all hover:shadow-sm ${task.color}`}
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-current" />
              {task.label}
            </Link>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Revenue Chart */}
          <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold">Revenue Overview</h2>
              <span className="text-primary rounded-sm bg-emerald-50 px-3 py-1 text-xs font-bold">
                Last 6 Months
              </span>
            </div>
            <div className="flex items-end justify-between gap-3" style={{ height: '160px' }}>
              {monthlyRevenue.map((d) => (
                <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-text-secondary text-xs">
                    ৳{(d.revenue / 1000).toFixed(0)}k
                  </span>
                  <div
                    className="w-full overflow-hidden rounded-sm bg-slate-100"
                    style={{ height: '120px' }}
                  >
                    <div
                      className="bg-primary w-full rounded-sm transition-all duration-700"
                      style={{
                        height: `${(d.revenue / maxRevenue) * 100}%`,
                        marginTop: `${100 - (d.revenue / maxRevenue) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-text-secondary text-xs">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-4 border-t border-slate-100 pt-5">
              {[
                { label: 'Total Revenue', value: '৳2,48,500', color: 'text-primary' },
                { label: 'Commission (20%)', value: '৳49,700', color: 'text-secondary' },
                { label: 'Instructor Earnings', value: '৳1,98,800', color: 'text-blue-500' },
              ].map((item, i) => (
                <div key={i} className="rounded-sm bg-slate-50 p-3 text-center">
                  <p className={`text-lg font-black ${item.color}`}>{item.value}</p>
                  <p className="text-text-secondary text-xs">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Recent Users */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">Recent Users</h2>
                <Link
                  href="/dashboard/admin/users"
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {recentUsers.map((user, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-emerald-50"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{user.name}</p>
                      <p className="text-text-secondary text-xs">{user.role}</p>
                    </div>
                    <p className="text-text-secondary shrink-0 text-xs">{user.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <h2 className="mb-4 text-lg font-bold">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  {
                    label: 'Verify Instructors',
                    href: '/dashboard/admin/instructors',
                    icon: <ShieldCheck size={15} />,
                  },
                  {
                    label: 'Process Withdrawals',
                    href: '/dashboard/admin/withdrawals',
                    icon: <Wallet size={15} />,
                  },
                  {
                    label: 'Moderate Reviews',
                    href: '/dashboard/admin/reviews',
                    icon: <Star size={15} />,
                  },
                  {
                    label: 'Manage Support',
                    href: '/dashboard/admin/support',
                    icon: <MessageSquare size={15} />,
                  },
                ].map((action, i) => (
                  <Link
                    key={i}
                    href={action.href}
                    className="bg-primary first:bg-primary flex items-center gap-3 rounded-sm px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#2a6159] [&:not(:first-child)]:border [&:not(:first-child)]:border-slate-200 [&:not(:first-child)]:bg-white [&:not(:first-child)]:text-slate-600 [&:not(:first-child)]:hover:bg-slate-50"
                  >
                    {action.icon}
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
