'use client';

import { Award, BookOpen, Clock, Play, Star, TrendingUp, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  {
    icon: <BookOpen size={22} />,
    label: 'Enrolled Courses',
    value: '6',
    sub: '+2 this month',
    trend: 'up',
  },
  {
    icon: <TrendingUp size={22} />,
    label: 'Completed',
    value: '3',
    sub: '50% completion rate',
    trend: 'up',
  },
  {
    icon: <Award size={22} />,
    label: 'Certificates',
    value: '3',
    sub: 'Download anytime',
    trend: 'up',
  },
  {
    icon: <Clock size={22} />,
    label: 'Hours Learned',
    value: '48h',
    sub: '4h this week',
    trend: 'up',
  },
];

const continueLearning = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Md. Rafiqul Islam',
    progress: 72,
    totalLessons: 48,
    completedLessons: 34,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600',
    lastLesson: 'React Hooks: useState & useEffect',
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass with Figma',
    instructor: 'Farhan Hossain',
    progress: 45,
    totalLessons: 36,
    completedLessons: 16,
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=600',
    lastLesson: 'Building a Design System',
  },
  {
    id: 3,
    title: 'Digital Marketing from Zero to Hero',
    instructor: 'Nasrin Sultana',
    progress: 20,
    totalLessons: 30,
    completedLessons: 6,
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07d?q=80&w=600',
    lastLesson: 'SEO Fundamentals',
  },
];

const liveSessions = [
  {
    id: 1,
    title: 'React Advanced Patterns',
    instructor: 'Md. Rafiqul Islam',
    instructorImage: 'https://i.pravatar.cc/150?u=rafiq',
    date: 'Today',
    time: '7:00 PM',
    platform: 'Zoom',
    course: 'Web Development',
  },
  {
    id: 2,
    title: 'Figma Component Library',
    instructor: 'Farhan Hossain',
    instructorImage: 'https://i.pravatar.cc/150?u=farhan',
    date: 'Tomorrow',
    time: '5:00 PM',
    platform: 'Google Meet',
    course: 'UI/UX Design',
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'lesson',
    text: 'Completed lesson "Flexbox Layout" in Web Development',
    time: '2 hours ago',
    icon: '✅',
  },
  {
    id: 2,
    type: 'certificate',
    text: 'Certificate earned for "Freelancing Masterclass"',
    time: 'Yesterday',
    icon: '🎓',
  },
  {
    id: 3,
    type: 'quiz',
    text: 'Scored 90% on JavaScript Fundamentals quiz',
    time: '2 days ago',
    icon: '🏆',
  },
  {
    id: 4,
    type: 'enroll',
    text: 'Enrolled in "Digital Marketing from Zero to Hero"',
    time: '3 days ago',
    icon: '📚',
  },
  {
    id: 5,
    type: 'live',
    text: 'Attended live session "CSS Grid Deep Dive"',
    time: '4 days ago',
    icon: '🎥',
  },
];

const certificates = [
  {
    id: 1,
    title: 'Freelancing Masterclass',
    instructor: 'Sabbir Hossain',
    date: 'April 2025',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=300',
  },
  {
    id: 2,
    title: 'Graphic Design Fundamentals',
    instructor: 'Mithila Rahman',
    date: 'March 2025',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=300',
  },
  {
    id: 3,
    title: 'Data Analytics Basics',
    instructor: 'Imran Hossain',
    date: 'February 2025',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=300',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const StudentOverviewPage = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        <div className="bg-primary relative overflow-hidden rounded-md px-8 py-8">
          {/* Dot Grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
          {/* Glow */}
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 text-sm font-medium text-white/60">Welcome back 👋</p>
              <h1 className="text-2xl font-black text-white md:text-3xl">Sumaiya Akter</h1>
              <p className="mt-2 text-sm text-white/60">
                You have <span className="font-bold text-white">3 courses</span> in progress. Keep
                going!
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Streak */}
              <div className="rounded-md border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
                <p className="text-2xl font-black text-yellow-400">🔥 7</p>
                <p className="text-xs text-white/60">Day Streak</p>
              </div>
              {/* Weekly Goal */}
              <div className="rounded-md border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
                <p className="text-2xl font-black text-white">4h</p>
                <p className="text-xs text-white/60">This Week</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-md border border-slate-100 bg-white p-5 shadow-xs transition-all duration-300 hover:border-emerald-100 hover:shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="text-primary flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-50">
                  {stat.icon}
                </div>
                <span className="text-success bg-success/10 rounded-full px-2 py-0.5 text-xs font-semibold">
                  ↑
                </span>
              </div>
              <p className="text-text-primary text-2xl font-black">{stat.value}</p>
              <p className="text-text-secondary mt-0.5 text-sm font-medium">{stat.label}</p>
              <p className="text-text-secondary mt-1 text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Main Grid ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ── Left (2/3) ────────────────────────────────────────────────── */}
          <div className="space-y-6 lg:col-span-2">
            {/* Continue Learning */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">Continue Learning</h2>
                <Link
                  href="/dashboard/student/courses"
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                {continueLearning.map((course) => (
                  <div
                    key={course.id}
                    className="group flex items-center gap-4 rounded-sm border border-slate-100 p-4 transition-all duration-300 hover:border-emerald-100 hover:bg-emerald-50/30"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm">
                      <Image src={course.image} alt={course.title} fill className="object-cover" />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <h4 className="group-hover:text-primary mb-0.5 truncate text-sm font-bold transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-text-secondary mb-2 text-xs">{course.instructor}</p>
                      <p className="text-text-secondary mb-2 truncate text-xs">
                        Last:{' '}
                        <span className="font-medium text-slate-600">{course.lastLesson}</span>
                      </p>

                      {/* Progress Bar */}
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="bg-primary h-full rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-primary shrink-0 text-xs font-bold">
                          {course.progress}%
                        </span>
                      </div>
                    </div>

                    {/* Play Button */}
                    <Link
                      href={`/courses/${course.id}`}
                      className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100"
                    >
                      <Play size={14} fill="white" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* My Certificates */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">My Certificates</h2>
                <Link
                  href="/dashboard/student/certificates"
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="group cursor-pointer overflow-hidden rounded-sm border border-slate-100 transition-all duration-300 hover:border-emerald-100 hover:shadow-sm"
                  >
                    <div className="relative h-28 overflow-hidden">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Award size={28} className="text-yellow-400" />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="line-clamp-1 text-sm font-bold">{cert.title}</p>
                      <p className="text-text-secondary text-xs">{cert.date}</p>
                      <button className="text-primary mt-2 text-xs font-semibold hover:underline">
                        Download PDF →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right (1/3) ───────────────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Upcoming Live Sessions */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">Live Sessions</h2>
                <Link
                  href="/dashboard/student/live-sessions"
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                {liveSessions.map((session) => (
                  <div
                    key={session.id}
                    className="rounded-sm border border-slate-100 p-4 transition-all hover:border-emerald-100"
                  >
                    {/* Date Badge */}
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          session.date === 'Today'
                            ? 'text-primary bg-emerald-50'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {session.date} • {session.time}
                      </span>
                      <span className="rounded-sm bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                        {session.platform}
                      </span>
                    </div>

                    <h4 className="mb-2 text-sm font-bold">{session.title}</h4>

                    <div className="mb-3 flex items-center gap-2">
                      <Image
                        src={session.instructorImage}
                        alt={session.instructor}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <span className="text-text-secondary text-xs">{session.instructor}</span>
                    </div>

                    <button
                      className={`flex w-full items-center justify-center gap-2 rounded-sm py-2.5 text-xs font-bold transition-all active:scale-95 ${
                        session.date === 'Today'
                          ? 'bg-primary text-white hover:bg-[#2a6159]'
                          : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Video size={13} />
                      {session.date === 'Today' ? 'Join Now' : 'Set Reminder'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <h2 className="mb-5 text-lg font-bold">Recent Activity</h2>

              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed text-slate-600">{activity.text}</p>
                      <p className="text-text-secondary mt-0.5 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats Donut */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <h2 className="mb-5 text-lg font-bold">Course Progress</h2>

              <div className="space-y-3">
                {continueLearning.map((course) => (
                  <div key={course.id}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="line-clamp-1 text-xs font-medium text-slate-600">
                        {course.title}
                      </span>
                      <span className="text-primary ml-2 shrink-0 text-xs font-bold">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-text-secondary mt-1 text-[10px]">
                      {course.completedLessons}/{course.totalLessons} lessons
                    </p>
                  </div>
                ))}
              </div>

              {/* Overall */}
              <div className="mt-5 rounded-sm bg-emerald-50 p-4 text-center">
                <p className="text-primary text-2xl font-black">46%</p>
                <p className="text-text-secondary text-xs">Overall Completion</p>
                <div className="mt-2 flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={11} fill={i <= 4 ? '#ffc107' : 'none'} color="#ffc107" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentOverviewPage;
