'use client';

import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  GraduationCap,
  PlayCircle,
  Star,
  TrendingUp,
  Video,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const statsData = [
  {
    label: 'Enrolled Courses',
    value: '4',
    change: '+2 new',
    changeType: 'positive',
    icon: BookOpen,
    color: 'teal',
    progress: 67,
  },
  {
    label: 'Hours Learned',
    value: '18h',
    change: 'This week',
    changeType: 'neutral',
    icon: Clock,
    color: 'orange',
    progress: 45,
  },
  {
    label: 'Certificates Earned',
    value: '2',
    change: 'Verified',
    changeType: 'positive',
    icon: Award,
    color: 'green',
    progress: 50,
  },
  {
    label: 'Lessons Completed',
    value: '34',
    change: '+5 today',
    changeType: 'positive',
    icon: CheckCircle,
    color: 'blue',
    progress: 71,
  },
];

const coursesData = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Md. Rafiqul Islam',
    lessons: 48,
    progress: 72,
    color: 'teal',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=100',
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass with Figma',
    instructor: 'Farhan Hossain',
    lessons: 36,
    progress: 45,
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=100',
  },
  {
    id: 3,
    title: 'Digital Marketing from Zero to Hero',
    instructor: 'Nasrin Sultana',
    lessons: 30,
    progress: 20,
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07d?q=80&w=100',
  },
  {
    id: 4,
    title: 'Freelancing: Beginner to Pro',
    instructor: 'Sabbir Hossain',
    lessons: 24,
    progress: 90,
    color: 'green',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=100',
  },
];

const activityData = [
  {
    icon: PlayCircle,
    color: 'teal',
    text: 'Lesson 34 completed',
    sub: 'React Hooks — Web Dev',
    time: '2h ago',
  },
  {
    icon: Award,
    color: 'green',
    text: 'Certificate earned',
    sub: 'Freelancing Pro Course',
    time: '1d ago',
  },
  {
    icon: Star,
    color: 'orange',
    text: 'Review submitted',
    sub: 'UI/UX Design Masterclass',
    time: '2d ago',
  },
  {
    icon: Video,
    color: 'blue',
    text: 'Joined live session',
    sub: 'CSS Flexbox Deep Dive',
    time: '3d ago',
  },
  {
    icon: CheckCircle,
    color: 'teal',
    text: 'Quiz passed — 92%',
    sub: 'JavaScript Basics',
    time: '4d ago',
  },
  {
    icon: BookOpen,
    color: 'orange',
    text: 'Enrolled in new course',
    sub: 'Digital Marketing',
    time: '5d ago',
  },
];

const certificatesData = [
  { title: 'Freelancing Pro', date: 'April 2025' },
  { title: 'Web Development', date: 'February 2025' },
];

const liveSessionsData = [
  {
    title: 'React State Management',
    instructor: 'Rafiqul Islam',
    status: 'live',
    statusLabel: '● Live Now',
    meta: 'Started 10 min ago',
  },
  {
    title: 'Figma Auto Layout',
    instructor: 'Farhan Hossain',
    status: 'soon',
    statusLabel: 'Tomorrow',
    meta: '7:00 PM',
  },
  {
    title: 'SEO Fundamentals',
    instructor: 'Nasrin Sultana',
    status: 'soon',
    statusLabel: 'May 26',
    meta: '6:00 PM',
  },
];

const skillsData = [
  { name: 'HTML & CSS', pct: 95, color: 'bg-primary' },
  { name: 'JavaScript', pct: 72, color: 'bg-primary' },
  { name: 'Figma / UI Design', pct: 45, color: 'bg-secondary' },
  { name: 'Digital Marketing', pct: 20, color: 'bg-blue-500' },
  { name: 'Freelancing', pct: 90, color: 'bg-green-600' },
];

// ─── Color Maps ───────────────────────────────────────────────────────────────

const iconBg: Record<string, string> = {
  teal: 'bg-[#eef5f5] text-primary',
  orange: 'bg-[#fef5e7] text-secondary',
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-emerald-50 text-emerald-700',
};

const progressColor: Record<string, string> = {
  teal: 'bg-primary',
  orange: 'bg-secondary',
  blue: 'bg-blue-500',
  green: 'bg-emerald-600',
};

const progressText: Record<string, string> = {
  teal: 'text-primary',
  orange: 'text-secondary',
  blue: 'text-blue-600',
  green: 'text-emerald-700',
};

const changeBg: Record<string, string> = {
  positive: 'bg-emerald-50 text-emerald-700',
  neutral: 'bg-[#fef5e7] text-secondary',
};

const StudentOverviewPage = () => {
  return (
    <div className="flex-1">
      {/* Welcome Banner */}
      <div className="bg-primary relative mb-6 overflow-hidden rounded-md px-6 py-5">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/5" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">Good morning,</p>
            <h2 className="mt-0.5 text-xl font-bold text-white">Sumaiya Akter 👋</h2>
            <p className="mt-1 text-sm text-white/60">
              তুমি এই সপ্তাহে <span className="font-semibold text-white">3টি লেসন</span> সম্পন্ন
              করেছ। চালিয়ে যাও!
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-2 rounded-sm bg-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/20"
          >
            Browse Courses
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {statsData.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="rounded-md border border-slate-100 bg-white p-4 shadow-xs">
              <div className="mb-3 flex items-center justify-between">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-sm ${iconBg[stat.color]}`}
                >
                  <Icon size={18} />
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${changeBg[stat.changeType]}`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-black text-slate-800">{stat.value}</p>
              <p className="mb-2 text-sm text-slate-400">{stat.label}</p>
              <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all ${progressColor[stat.color]}`}
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-col: Courses + Activity */}
      <div className="mb-6 grid grid-cols-[1.6fr_1fr] gap-5">
        {/* Continue Learning */}
        <div className="rounded-md border border-slate-100 bg-white shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 className="text-sm font-bold text-slate-700">Continue Learning</h3>
            <Link
              href="/dashboard/student/courses"
              className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
            >
              View all <ChevronRight size={12} />
            </Link>
          </div>

          {coursesData.map((course) => (
            <div
              key={course.id}
              className="flex items-center gap-3.5 border-b border-slate-50 px-5 py-3.5 transition-colors last:border-b-0 hover:bg-slate-50/50"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-sm">
                <Image src={course.image} alt={course.title} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-700">{course.title}</p>
                <p className="text-[11px] text-slate-400">
                  {course.instructor} · {course.lessons} lessons
                </p>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${progressColor[course.color]}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
              <span className={`shrink-0 text-sm font-bold ${progressText[course.color]}`}>
                {course.progress}%
              </span>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="rounded-md border border-slate-100 bg-white shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 className="text-sm font-bold text-slate-700">Recent Activity</h3>
            <span className="text-primary cursor-pointer text-sm font-medium hover:underline">
              See all
            </span>
          </div>

          {activityData.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-3 border-b border-slate-50 px-5 py-3 last:border-b-0"
              >
                <div
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${iconBg[item.color]}`}
                >
                  <Icon size={13} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-700">{item.text}</p>
                  <p className="truncate text-[11px] text-slate-400">{item.sub}</p>
                </div>
                <span className="shrink-0 text-[10px] text-slate-400">{item.time}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Three-col bottom */}
      <div className="grid grid-cols-3 gap-5">
        {/* Certificates */}
        <div className="rounded-md border border-slate-100 bg-white shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 className="text-sm font-bold text-slate-700">My Certificates</h3>
            <Link
              href="/dashboard/student/certificates"
              className="text-primary text-sm font-medium hover:underline"
            >
              View all
            </Link>
          </div>

          {certificatesData.map((cert, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border-b border-slate-50 px-5 py-3.5 last:border-b-0"
            >
              <div className="text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[#eef5f5]">
                <GraduationCap size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-700">{cert.title}</p>
                <p className="text-[11px] text-slate-400">Issued {cert.date}</p>
              </div>
              <button className="hover:border-primary hover:text-primary flex h-7 w-7 items-center justify-center rounded-sm border border-slate-200 text-slate-400 transition-all">
                <Download size={13} />
              </button>
            </div>
          ))}

          <div className="px-5 py-3 text-center">
            <p className="text-[11px] text-slate-400">2 more courses in progress</p>
          </div>
        </div>

        {/* Live Sessions */}
        <div className="rounded-md border border-slate-100 bg-white shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 className="text-sm font-bold text-slate-700">Live Sessions</h3>
            <Link
              href="/dashboard/student/live-sessions"
              className="text-primary text-sm font-medium hover:underline"
            >
              View all
            </Link>
          </div>

          {liveSessionsData.map((session, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-3 border-b border-slate-50 px-5 py-3.5 last:border-b-0"
            >
              <div className="min-w-0 flex-1">
                <span
                  className={`mb-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    session.status === 'live'
                      ? 'bg-red-50 text-red-600'
                      : 'text-secondary bg-[#fef5e7]'
                  }`}
                >
                  {session.statusLabel}
                </span>
                <p className="text-sm font-semibold text-slate-700">{session.title}</p>
                <p className="text-[11px] text-slate-400">
                  {session.instructor} · {session.meta}
                </p>
              </div>
              {session.status === 'live' && (
                <button className="bg-primary mt-1 shrink-0 rounded-sm px-3 py-1.5 text-[11px] font-bold text-white transition-all hover:bg-[#2a6159] active:scale-95">
                  Join
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Skill Progress */}
        <div className="rounded-md border border-slate-100 bg-white shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 className="text-sm font-bold text-slate-700">Skill Progress</h3>
            <TrendingUp size={14} className="text-primary" />
          </div>

          {skillsData.map((skill, i) => (
            <div key={i} className="border-b border-slate-50 px-5 py-3 last:border-b-0">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm text-slate-600">{skill.name}</span>
                <span className="text-primary text-[11px] font-bold">{skill.pct}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${skill.color} transition-all duration-500`}
                  style={{ width: `${skill.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentOverviewPage;
