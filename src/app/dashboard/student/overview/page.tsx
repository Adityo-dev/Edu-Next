'use client';

import { ArrowRight, Award, BookOpen, CheckCircle, Clock, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// 1. Mock Data for Quick Stats
const studentStats = [
  {
    id: 1,
    title: 'Enrolled Courses',
    count: '12',
    icon: BookOpen,
    bgColor: 'bg-teal-accent',
    iconColor: 'text-primary-brand',
  },
  {
    id: 2,
    title: 'Active Learning',
    count: '03',
    icon: Clock,
    bgColor: 'bg-yellow-accent',
    iconColor: 'text-secondary',
  },
  {
    id: 3,
    title: 'Completed Courses',
    count: '07',
    icon: CheckCircle,
    bgColor: 'bg-emerald-50',
    iconColor: 'text-success',
  },
];

// 2. Mock Data for In-Progress Courses
const inProgressCourses = [
  {
    id: 'c1',
    title: 'Advanced UI/UX Design System with Figma',
    instructor: 'Alex Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=600',
    progress: 68,
    totalLessons: 24,
    completedLessons: 16,
  },
  {
    id: 'c2',
    title: 'Next.js 15 & TypeScript Production Blueprint',
    instructor: 'Aditto Dev Barmon',
    thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600',
    progress: 42,
    totalLessons: 35,
    completedLessons: 15,
  },
];

export default function StudentOverviewPage() {
  // Static placeholder metadata
  const studentName = 'Koushik';

  return (
    <div className="bg-section-slate min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-[1600px] space-y-10">
        {/* ================= WELCOME BANNER ================= */}
        <div className="bg-primary-brand text-pure-white relative overflow-hidden rounded-3xl p-8 shadow-xl shadow-teal-900/10 md:p-12">
          {/* Subtle Abstract Decorative Shapes */}
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="bg-secondary/20 absolute right-20 -bottom-10 h-32 w-32 rounded-full blur-xl" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold tracking-wider uppercase">
              Student Panel
            </span>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">
              Welcome Back, <span className="text-yellow-accent">{studentName}!</span>
            </h1>
            <p className="text-teal-accent/90 text-sm leading-relaxed font-medium md:text-base">
              Your modular roadmap is waiting for you. Pick up right where you left off and scale
              your technical logic step-by-step.
            </p>
          </div>
        </div>

        {/* ================= STATS MATRIX GRID ================= */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studentStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="border-subtle bg-pure-white flex items-center gap-5 rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${stat.bgColor} ${stat.iconColor}`}
                >
                  <Icon size={26} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-text-secondary text-sm font-bold tracking-wider uppercase">
                    {stat.title}
                  </p>
                  <h3 className="text-text-primary mt-1 text-3xl font-black">{stat.count}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= MAIN CONTENT AREA ================= */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* Left / Center 2-Columns: In-Progress Courses */}
          <div className="space-y-6 xl:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-text-primary text-2xl font-black tracking-tight">
                In-Progress <span className="text-primary-brand">Courses</span>
              </h2>
              <Link
                href="/dashboard/student/my-courses"
                className="text-primary-brand flex items-center gap-1.5 text-sm font-bold transition-colors hover:text-[#2a6159]"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {inProgressCourses.map((course) => (
                <div
                  key={course.id}
                  className="group border-subtle bg-pure-white hover:border-primary-brand/30 flex flex-col items-center gap-6 rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row"
                >
                  {/* Aspect Locked Thumbnail */}
                  <div className="bg-section-slate relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl sm:w-44">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      sizes="(max-w-640px) 100vw, 176px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="bg-pure-white text-primary-brand flex h-10 w-10 items-center justify-center rounded-full shadow-lg">
                        <Play size={16} fill="currentColor" className="ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Course Info & Metrics */}
                  <div className="w-full flex-1 space-y-4">
                    <div>
                      <span className="text-text-placeholder text-xs font-bold tracking-wider uppercase">
                        By {course.instructor}
                      </span>
                      <h3 className="text-text-primary group-hover:text-primary-brand mt-0.5 text-lg leading-snug font-black tracking-tight transition-colors">
                        {course.title}
                      </h3>
                    </div>

                    {/* Progress Bar Controller */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-text-secondary">
                          {course.completedLessons}/{course.totalLessons} Lessons Watched
                        </span>
                        <span className="text-primary-brand bg-teal-accent rounded-md px-2 py-0.5">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="bg-subtle h-2 w-full overflow-hidden rounded-full">
                        <div
                          className="bg-primary-brand h-full rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Continue Study Gateway Action */}
                  <div className="w-full pt-2 sm:w-auto sm:pt-0">
                    <Link
                      href={`/dashboard/student/classroom?id=${course.id}`}
                      className="bg-teal-accent border-primary-brand/10 text-primary-brand hover:bg-primary-brand hover:text-pure-white flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-bold transition-all group-hover:shadow-sm sm:w-max"
                    >
                      Resume <Play size={14} fill="currentColor" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Achievements / Micro Activity Stamp */}
          <div className="space-y-6">
            <h2 className="text-text-primary text-2xl font-black tracking-tight">
              Recent <span className="text-secondary">Milestones</span>
            </h2>

            <div className="border-subtle bg-pure-white space-y-5 rounded-2xl border p-6 shadow-sm">
              <div className="border-subtle flex items-start gap-4 border-b pb-4">
                <div className="bg-yellow-accent text-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-text-primary text-sm leading-tight font-bold">
                    Earned UI/UX Certification
                  </h4>
                  <p className="text-text-secondary mt-1 text-xs">
                    Completed all requirements for the visual stack blueprint.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-teal-accent text-primary-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="text-text-primary text-sm leading-tight font-bold">
                    Enrolled in Next.js 15
                  </h4>
                  <p className="text-text-secondary mt-1 text-xs">
                    Unlocked the enterprise production server ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
