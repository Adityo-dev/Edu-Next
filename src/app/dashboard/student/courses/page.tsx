'use client';

import { Award, BookOpen, Clock, Filter, Play, Search, Star, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const myCoursesData = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Md. Rafiqul Islam',
    instructorImage: 'https://i.pravatar.cc/150?u=rafiq',
    category: 'Web Development',
    progress: 72,
    totalLessons: 48,
    completedLessons: 34,
    duration: '24 hrs',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600',
    status: 'in-progress',
    enrolledDate: 'Jan 2025',
    lastAccessed: '2 hours ago',
    certificate: false,
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass with Figma',
    instructor: 'Farhan Hossain',
    instructorImage: 'https://i.pravatar.cc/150?u=farhan',
    category: 'UI/UX Design',
    progress: 45,
    totalLessons: 36,
    completedLessons: 16,
    duration: '18 hrs',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=600',
    status: 'in-progress',
    enrolledDate: 'Feb 2025',
    lastAccessed: 'Yesterday',
    certificate: false,
  },
  {
    id: 3,
    title: 'Freelancing: From Beginner to Pro',
    instructor: 'Sabbir Hossain',
    instructorImage: 'https://i.pravatar.cc/150?u=sabbir',
    category: 'Freelancing',
    progress: 100,
    totalLessons: 24,
    completedLessons: 24,
    duration: '12 hrs',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600',
    status: 'completed',
    enrolledDate: 'Dec 2024',
    lastAccessed: '2 weeks ago',
    certificate: true,
  },
  {
    id: 4,
    title: 'Graphic Design with Adobe Illustrator',
    instructor: 'Mithila Rahman',
    instructorImage: 'https://i.pravatar.cc/150?u=mithila',
    category: 'Graphic Design',
    progress: 100,
    totalLessons: 40,
    completedLessons: 40,
    duration: '20 hrs',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=600',
    status: 'completed',
    enrolledDate: 'Nov 2024',
    lastAccessed: '1 month ago',
    certificate: true,
  },
  {
    id: 5,
    title: 'Data Analytics with Python & Excel',
    instructor: 'Imran Hossain',
    instructorImage: 'https://i.pravatar.cc/150?u=imran',
    category: 'Data Analytics',
    progress: 100,
    totalLessons: 44,
    completedLessons: 44,
    duration: '22 hrs',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600',
    status: 'completed',
    enrolledDate: 'Oct 2024',
    lastAccessed: '2 months ago',
    certificate: true,
  },
  {
    id: 6,
    title: 'Digital Marketing from Zero to Hero',
    instructor: 'Nasrin Sultana',
    instructorImage: 'https://i.pravatar.cc/150?u=nasrin',
    category: 'Digital Marketing',
    progress: 20,
    totalLessons: 30,
    completedLessons: 6,
    duration: '15 hrs',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07d?q=80&w=600',
    status: 'in-progress',
    enrolledDate: 'Mar 2025',
    lastAccessed: '3 days ago',
    certificate: false,
  },
];

const statusColors: Record<string, string> = {
  'in-progress': 'bg-blue-50 text-blue-600',
  completed: 'bg-emerald-50 text-primary',
};

const statusLabels: Record<string, string> = {
  'in-progress': 'In Progress',
  completed: 'Completed',
};

// ─── Component

const MyCourses = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  const filtered = myCoursesData.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || c.status === filter;
    return matchSearch && matchFilter;
  });

  const totalCompleted = myCoursesData.filter((c) => c.status === 'completed').length;
  const totalInProgress = myCoursesData.filter((c) => c.status === 'in-progress').length;
  const totalCertificates = myCoursesData.filter((c) => c.certificate).length;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-text-primary text-2xl font-black">My Courses</h1>
            <p className="text-text-secondary mt-1 text-sm">
              Track your learning progress and continue where you left off.
            </p>
          </div>
          <Link
            href="/courses"
            className="bg-primary flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#2a6159] active:scale-95"
          >
            <BookOpen size={16} />
            Browse More Courses
          </Link>
        </div>

        {/* ── Quick Stats ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              label: 'Total Enrolled',
              value: myCoursesData.length,
              icon: <BookOpen size={18} />,
              color: 'bg-emerald-50 text-primary',
            },
            {
              label: 'In Progress',
              value: totalInProgress,
              icon: <Play size={18} />,
              color: 'bg-blue-50 text-blue-600',
            },
            {
              label: 'Completed',
              value: totalCompleted,
              icon: <Star size={18} />,
              color: 'bg-yellow-50 text-yellow-600',
            },
            {
              label: 'Certificates',
              value: totalCertificates,
              icon: <Award size={18} />,
              color: 'bg-orange-50 text-secondary',
            },
          ].map((stat, i) => (
            <div key={i} className="rounded-md border border-slate-100 bg-white p-5 shadow-xs">
              <div
                className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-sm ${stat.color}`}
              >
                {stat.icon}
              </div>
              <p className="text-text-primary text-2xl font-black">{stat.value}</p>
              <p className="text-text-secondary text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Filters & Search ────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Filter Tabs */}
          <div className="flex overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
            {[
              { key: 'all', label: `All (${myCoursesData.length})` },
              { key: 'in-progress', label: `In Progress (${totalInProgress})` },
              { key: 'completed', label: `Completed (${totalCompleted})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as typeof filter)}
                className={`px-4 py-2.5 text-sm font-semibold transition-all ${
                  filter === tab.key ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="focus:border-primary w-full rounded-sm border border-slate-200 bg-white py-2.5 pr-10 pl-10 text-sm transition-all outline-none focus:ring-2 focus:ring-emerald-100 sm:w-64"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* ── Courses Grid ────────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-md border border-slate-100 bg-white py-24 text-center shadow-xs">
            <Filter size={40} className="mb-4 text-slate-300" />
            <h3 className="mb-2 text-lg font-bold text-slate-500">No courses found</h3>
            <p className="text-text-secondary text-sm">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((course) => (
              <div
                key={course.id}
                className="group overflow-hidden rounded-md border border-slate-100 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-md hover:shadow-emerald-100/40"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Status Badge */}
                  <span
                    className={`absolute top-3 left-3 rounded-sm px-2.5 py-1 text-xs font-bold shadow-sm ${statusColors[course.status]}`}
                  >
                    {statusLabels[course.status]}
                  </span>

                  {/* Certificate Badge */}
                  {course.certificate && (
                    <span className="absolute top-3 right-3 rounded-sm bg-yellow-400 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                      🎓 Certified
                    </span>
                  )}

                  {/* Progress Overlay */}
                  <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/60 to-transparent p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/30">
                        <div
                          className={`h-full rounded-full ${course.status === 'completed' ? 'bg-yellow-400' : 'bg-primary'}`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-white">{course.progress}%</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category */}
                  <span className="text-primary mb-3 inline-block rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-semibold">
                    {course.category}
                  </span>

                  {/* Title */}
                  <h3 className="group-hover:text-primary mb-2 line-clamp-2 text-base leading-snug font-bold transition-colors duration-300">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  <div className="mb-3 flex items-center gap-2">
                    <Image
                      src={course.instructorImage}
                      alt={course.instructor}
                      width={20}
                      height={20}
                      className="rounded-full border border-emerald-100"
                    />
                    <span className="text-text-secondary text-xs">{course.instructor}</span>
                  </div>

                  {/* Stats Row */}
                  <div className="text-text-secondary mb-4 flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1">
                      <BookOpen size={11} />
                      {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {course.duration}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1">
                      <Star size={11} fill="#ffc107" color="#ffc107" />
                      {course.rating}
                    </span>
                  </div>

                  <div className="mb-4 h-px bg-slate-100" />

                  {/* Last Accessed + CTA */}
                  <div className="flex items-center justify-between">
                    <p className="text-text-secondary text-xs">{course.lastAccessed}</p>

                    {course.status === 'completed' ? (
                      <div className="flex items-center gap-2">
                        <button className="text-primary text-xs font-bold hover:underline">
                          Download Certificate
                        </button>
                      </div>
                    ) : (
                      <Link
                        href={`/courses/${course.id}`}
                        className="bg-primary flex items-center gap-1.5 rounded-sm px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#2a6159] active:scale-95"
                      >
                        <Play size={11} fill="white" />
                        Continue
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
