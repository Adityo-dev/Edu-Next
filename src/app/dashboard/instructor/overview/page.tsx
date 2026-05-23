'use client';

import { BookOpen, CircleDollarSign, Star, TrendingUp, Users, Video, Wallet } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { icon: <BookOpen size={20} />, label: 'Total Courses', value: '8', sub: '+2 this month' },
  { icon: <Users size={20} />, label: 'Total Students', value: '1.2k', sub: '+48 this week' },
  {
    icon: <CircleDollarSign size={20} />,
    label: 'Total Revenue',
    value: '৳48,500',
    sub: 'After commission',
  },
  {
    icon: <Wallet size={20} />,
    label: 'Wallet Balance',
    value: '৳12,300',
    sub: 'Available to withdraw',
  },
];

const recentCourses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    students: 320,
    revenue: '৳18,000',
    rating: 4.9,
    status: 'published',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600',
  },
  {
    id: 2,
    title: 'React.js Advanced Masterclass',
    students: 210,
    revenue: '৳12,600',
    rating: 4.8,
    status: 'published',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600',
  },
  {
    id: 3,
    title: 'Node.js & Express API Development',
    students: 0,
    revenue: '৳0',
    rating: 0,
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600',
  },
];

const recentStudents = [
  {
    name: 'Sumaiya Akter',
    course: 'Web Development',
    date: '2 hours ago',
    image: 'https://i.pravatar.cc/150?u=sumaiya',
  },
  {
    name: 'Nusrat Jahan',
    course: 'Web Development',
    date: 'Yesterday',
    image: 'https://i.pravatar.cc/150?u=nusrat',
  },
  {
    name: 'Arif Hossain',
    course: 'React.js Advanced',
    date: '2 days ago',
    image: 'https://i.pravatar.cc/150?u=arif',
  },
  {
    name: 'Rakib Ahmed',
    course: 'React.js Advanced',
    date: '3 days ago',
    image: 'https://i.pravatar.cc/150?u=rakib2',
  },
];

const weeklyRevenue = [
  { day: 'Mon', amount: 3200 },
  { day: 'Tue', amount: 1800 },
  { day: 'Wed', amount: 4500 },
  { day: 'Thu', amount: 2100 },
  { day: 'Fri', amount: 5200 },
  { day: 'Sat', amount: 6800 },
  { day: 'Sun', amount: 3900 },
];

const maxAmount = Math.max(...weeklyRevenue.map((d) => d.amount));

const InstructorOverviewPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="bg-primary relative overflow-hidden rounded-md px-8 py-8">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
          <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 text-sm text-white/60">Welcome back 👋</p>
              <h1 className="text-2xl font-black text-white md:text-3xl">Md. Rafiqul Islam</h1>
              <p className="mt-2 text-sm text-white/60">
                You have <span className="font-bold text-white">3 active courses</span> and{' '}
                <span className="font-bold text-white">1 pending approval.</span>
              </p>
            </div>
            <div className="flex gap-4">
              <div className="rounded-md border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
                <p className="text-2xl font-black text-yellow-400">4.9</p>
                <p className="text-xs text-white/60">Avg Rating</p>
              </div>
              <div className="rounded-md border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
                <p className="text-2xl font-black text-white">8</p>
                <p className="text-xs text-white/60">Courses</p>
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
              <p className="text-text-primary text-2xl font-black">{stat.value}</p>
              <p className="text-sm font-semibold text-slate-600">{stat.label}</p>
              <p className="text-text-secondary mt-0.5 text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left 2/3 */}
          <div className="space-y-6 lg:col-span-2">
            {/* Recent Courses */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">My Courses</h2>
                <Link
                  href="/dashboard/instructor/courses"
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center gap-4 rounded-sm border border-slate-100 p-4 transition-all hover:border-emerald-100"
                  >
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm">
                      <Image src={course.image} alt={course.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-1 truncate text-sm font-bold">{course.title}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Users size={11} />
                          {course.students} students
                        </span>
                        <span className="flex items-center gap-1">
                          <CircleDollarSign size={11} />
                          {course.revenue}
                        </span>
                        {course.rating > 0 && (
                          <span className="flex items-center gap-1">
                            <Star size={11} fill="#ffc107" color="#ffc107" />
                            {course.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                        course.status === 'published'
                          ? 'text-primary bg-emerald-50'
                          : 'bg-yellow-50 text-yellow-600'
                      }`}
                    >
                      {course.status === 'published' ? 'Published' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">Weekly Revenue</h2>
                <span className="text-primary text-sm font-bold">৳27,500 this week</span>
              </div>
              <div className="flex items-end justify-between gap-2" style={{ height: '120px' }}>
                {weeklyRevenue.map((day) => (
                  <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full overflow-hidden rounded-sm bg-slate-100"
                      style={{ height: '90px' }}
                    >
                      <div
                        className="bg-primary w-full rounded-sm transition-all duration-500"
                        style={{
                          height: `${(day.amount / maxAmount) * 100}%`,
                          marginTop: `${100 - (day.amount / maxAmount) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-text-secondary text-[10px]">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 1/3 */}
          <div className="space-y-6">
            {/* Recent Students */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">New Students</h2>
                <Link
                  href="/dashboard/instructor/students"
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {recentStudents.map((student, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Image
                      src={student.image}
                      alt={student.name}
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-emerald-50"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{student.name}</p>
                      <p className="text-text-secondary truncate text-xs">{student.course}</p>
                    </div>
                    <p className="text-text-secondary shrink-0 text-xs">{student.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <h2 className="mb-4 text-lg font-bold">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  {
                    label: 'Create New Course',
                    href: '/dashboard/instructor/courses/create',
                    icon: <BookOpen size={15} />,
                    color: 'bg-primary text-white hover:bg-[#2a6159]',
                  },
                  {
                    label: 'Schedule Live Session',
                    href: '/dashboard/instructor/live-sessions',
                    icon: <Video size={15} />,
                    color: 'border border-slate-200 text-slate-600 hover:bg-slate-50',
                  },
                  {
                    label: 'Request Withdrawal',
                    href: '/dashboard/instructor/withdrawal',
                    icon: <Wallet size={15} />,
                    color: 'border border-slate-200 text-slate-600 hover:bg-slate-50',
                  },
                  {
                    label: 'View Analytics',
                    href: '/dashboard/instructor/analytics',
                    icon: <TrendingUp size={15} />,
                    color: 'border border-slate-200 text-slate-600 hover:bg-slate-50',
                  },
                ].map((action, i) => (
                  <Link
                    key={i}
                    href={action.href}
                    className={`flex items-center gap-3 rounded-sm px-4 py-3 text-sm font-semibold transition-all ${action.color}`}
                  >
                    {action.icon}
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Wallet Summary */}
            <div className="bg-primary rounded-md p-5 shadow-xs">
              <div className="mb-3 flex items-center justify-between">
                <Wallet size={20} className="text-white/70" />
                <span className="text-xs text-white/50">Available Balance</span>
              </div>
              <p className="mb-1 text-3xl font-black text-white">৳12,300</p>
              <p className="mb-4 text-xs text-white/60">Last withdrawal: ৳8,000 on Apr 1</p>
              <Link
                href="/dashboard/instructor/withdrawal"
                className="bg-secondary block rounded-sm py-2.5 text-center text-sm font-bold text-white transition-all hover:bg-[#d98c0a]"
              >
                Request Withdrawal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorOverviewPage;
