'use client';

import { Award, BookOpen, CheckCircle, Clock, Flame, Star, Target, Zap } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const overallStats = [
  {
    icon: <BookOpen size={20} />,
    label: 'Lessons Completed',
    value: '100',
    sub: 'out of 182 total',
  },
  { icon: <Clock size={20} />, label: 'Hours Learned', value: '48h', sub: '4h this week' },
  { icon: <Target size={20} />, label: 'Quiz Average', value: '87%', sub: '+5% from last month' },
  { icon: <Award size={20} />, label: 'Certificates', value: '3', sub: '3 more in progress' },
];

const courseProgress = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Md. Rafiqul Islam',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600',
    progress: 72,
    completedLessons: 34,
    totalLessons: 48,
    quizScore: 90,
    hoursSpent: '18h',
    status: 'in-progress',
    lastActivity: '2 hours ago',
    weeklyGoal: 80,
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass with Figma',
    instructor: 'Farhan Hossain',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=600',
    progress: 45,
    completedLessons: 16,
    totalLessons: 36,
    quizScore: 82,
    hoursSpent: '10h',
    status: 'in-progress',
    lastActivity: 'Yesterday',
    weeklyGoal: 50,
  },
  {
    id: 3,
    title: 'Freelancing: From Beginner to Pro',
    instructor: 'Sabbir Hossain',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600',
    progress: 100,
    completedLessons: 24,
    totalLessons: 24,
    quizScore: 95,
    hoursSpent: '12h',
    status: 'completed',
    lastActivity: '2 weeks ago',
    weeklyGoal: 100,
  },
  {
    id: 4,
    title: 'Graphic Design with Adobe Illustrator',
    instructor: 'Mithila Rahman',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=600',
    progress: 100,
    completedLessons: 40,
    totalLessons: 40,
    quizScore: 88,
    hoursSpent: '20h',
    status: 'completed',
    lastActivity: '1 month ago',
    weeklyGoal: 100,
  },
  {
    id: 5,
    title: 'Digital Marketing from Zero to Hero',
    instructor: 'Nasrin Sultana',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07d?q=80&w=600',
    progress: 20,
    completedLessons: 6,
    totalLessons: 30,
    quizScore: 75,
    hoursSpent: '4h',
    status: 'in-progress',
    lastActivity: '3 days ago',
    weeklyGoal: 30,
  },
];

const quizHistory = [
  {
    course: 'Web Development',
    quiz: 'JavaScript Fundamentals',
    score: 90,
    date: 'Apr 20',
    passed: true,
  },
  { course: 'UI/UX Design', quiz: 'Design Principles', score: 82, date: 'Apr 18', passed: true },
  { course: 'Digital Marketing', quiz: 'SEO Basics', score: 75, date: 'Apr 15', passed: true },
  { course: 'Web Development', quiz: 'HTML & CSS Basics', score: 95, date: 'Apr 10', passed: true },
  { course: 'Freelancing', quiz: 'Client Management', score: 60, date: 'Apr 5', passed: false },
];

const weeklyActivity = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 1 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 0.5 },
  { day: 'Fri', hours: 2 },
  { day: 'Sat', hours: 4 },
  { day: 'Sun', hours: 1.5 },
];

const skillsData = [
  { skill: 'Web Development', level: 72, color: 'bg-primary' },
  { skill: 'UI/UX Design', level: 45, color: 'bg-blue-400' },
  { skill: 'Digital Marketing', level: 20, color: 'bg-secondary' },
  { skill: 'Freelancing', level: 100, color: 'bg-emerald-400' },
  { skill: 'Graphic Design', level: 100, color: 'bg-purple-400' },
];

const maxHours = Math.max(...weeklyActivity.map((d) => d.hours));

// ─── Component ────────────────────────────────────────────────────────────────

const StudentProgressPage = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'quizzes' | 'skills'>('courses');

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div>
          <h1 className="text-text-primary text-2xl font-black">My Progress</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Track your learning journey — lessons, quizzes, and skills.
          </p>
        </div>

        {/* ── Stats Row ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {overallStats.map((stat, i) => (
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

        {/* ── Main Grid ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ── Left (2/3) ────────────────────────────────────────────────── */}
          <div className="space-y-6 lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
              {[
                { key: 'courses', label: 'Course Progress' },
                { key: 'quizzes', label: 'Quiz History' },
                { key: 'skills', label: 'Skills' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`px-5 py-2.5 text-sm font-semibold transition-all ${
                    activeTab === tab.key
                      ? 'bg-primary text-white'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── Course Progress Tab ───────────────────────────────────── */}
            {activeTab === 'courses' && (
              <div className="space-y-4">
                {courseProgress.map((course) => (
                  <div
                    key={course.id}
                    className="rounded-md border border-slate-100 bg-white p-5 shadow-xs transition-all hover:border-emerald-100"
                  >
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        {course.status === 'completed' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <CheckCircle size={24} className="text-yellow-400" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <h3 className="line-clamp-1 text-sm font-bold">{course.title}</h3>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              course.status === 'completed'
                                ? 'text-primary bg-emerald-50'
                                : 'bg-blue-50 text-blue-600'
                            }`}
                          >
                            {course.status === 'completed' ? 'Completed' : 'In Progress'}
                          </span>
                        </div>

                        <p className="text-text-secondary mb-3 text-xs">{course.instructor}</p>

                        {/* Progress Bar */}
                        <div className="mb-2 flex items-center gap-3">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full transition-all ${
                                course.status === 'completed' ? 'bg-yellow-400' : 'bg-primary'
                              }`}
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span
                            className={`text-xs font-black ${
                              course.status === 'completed' ? 'text-yellow-500' : 'text-primary'
                            }`}
                          >
                            {course.progress}%
                          </span>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <BookOpen size={11} />
                            {course.completedLessons}/{course.totalLessons} lessons
                          </span>
                          <span className="text-slate-300">|</span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {course.hoursSpent}
                          </span>
                          <span className="text-slate-300">|</span>
                          <span className="flex items-center gap-1">
                            <Star size={11} fill="#ffc107" color="#ffc107" />
                            Quiz: {course.quizScore}%
                          </span>
                          <span className="text-slate-300">|</span>
                          <span>{course.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Quiz History Tab ──────────────────────────────────────── */}
            {activeTab === 'quizzes' && (
              <div className="rounded-md border border-slate-100 bg-white shadow-xs">
                <div className="divide-y divide-slate-50">
                  {quizHistory.map((quiz, i) => (
                    <div key={i} className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-4">
                        {/* Score Circle */}
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                            quiz.score >= 80
                              ? 'text-primary bg-emerald-50'
                              : quiz.score >= 60
                                ? 'bg-yellow-50 text-yellow-600'
                                : 'bg-red-50 text-red-500'
                          }`}
                        >
                          {quiz.score}%
                        </div>
                        <div>
                          <p className="text-sm font-bold">{quiz.quiz}</p>
                          <p className="text-text-secondary text-xs">{quiz.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-text-secondary text-xs">{quiz.date}</span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                            quiz.passed ? 'text-primary bg-emerald-50' : 'bg-red-50 text-red-500'
                          }`}
                        >
                          {quiz.passed ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Skills Tab ────────────────────────────────────────────── */}
            {activeTab === 'skills' && (
              <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
                <p className="text-text-secondary mb-6 text-sm">
                  Skills are calculated based on your course completion progress.
                </p>
                <div className="space-y-5">
                  {skillsData.map((skill, i) => (
                    <div key={i}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700">{skill.skill}</span>
                        <span
                          className={`text-xs font-black ${
                            skill.level === 100 ? 'text-yellow-500' : 'text-primary'
                          }`}
                        >
                          {skill.level === 100 ? '🏆 Mastered' : `${skill.level}%`}
                        </span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${skill.color}`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right (1/3) ───────────────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Streak & Goal */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <h3 className="mb-5 text-base font-bold">This Week</h3>

              {/* Weekly Bar Chart */}
              <div className="mb-5 flex items-end justify-between gap-1.5">
                {weeklyActivity.map((day) => (
                  <div key={day.day} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-primary text-[10px] font-bold">
                      {day.hours > 0 ? `${day.hours}h` : ''}
                    </span>
                    <div
                      className="w-full overflow-hidden rounded-sm bg-slate-100"
                      style={{ height: '60px' }}
                    >
                      <div
                        className="bg-primary w-full rounded-sm transition-all duration-500"
                        style={{
                          height: `${(day.hours / maxHours) * 100}%`,
                          marginTop: `${100 - (day.hours / maxHours) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-text-secondary text-[10px]">{day.day}</span>
                  </div>
                ))}
              </div>

              <div className="mb-4 h-px bg-slate-100" />

              {/* Streak */}
              <div className="flex items-center justify-between rounded-sm bg-orange-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Flame size={20} className="text-secondary" />
                  <span className="text-sm font-bold text-slate-700">Current Streak</span>
                </div>
                <span className="text-secondary text-xl font-black">7 days 🔥</span>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <h3 className="mb-5 text-base font-bold">Overall Progress</h3>

              {/* Big Circle */}
              <div className="mb-5 flex flex-col items-center">
                <div className="relative flex h-32 w-32 items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#34796f"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - 0.55)}`}
                      className="transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-primary text-2xl font-black">55%</p>
                    <p className="text-text-secondary text-xs">Overall</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Lessons Done', value: '100/182', percent: 55 },
                  { label: 'Quizzes Passed', value: '4/5', percent: 80 },
                  { label: 'Courses Done', value: '3/6', percent: 50 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="font-medium text-slate-600">{item.label}</span>
                      <span className="text-primary font-bold">{item.value}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
              <h3 className="mb-4 text-base font-bold">Achievements</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { emoji: '🔥', label: '7-Day Streak', earned: true },
                  { emoji: '🎓', label: 'First Cert', earned: true },
                  { emoji: '⚡', label: 'Fast Learner', earned: true },
                  { emoji: '🏆', label: 'Top Scorer', earned: false },
                  { emoji: '📚', label: '5 Courses', earned: false },
                  { emoji: '💎', label: 'Pro Learner', earned: false },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center rounded-sm p-3 text-center transition-all ${
                      badge.earned
                        ? 'border border-emerald-100 bg-emerald-50'
                        : 'border border-slate-100 bg-slate-50 opacity-40'
                    }`}
                  >
                    <span className="mb-1 text-2xl">{badge.emoji}</span>
                    <span className="text-[10px] leading-tight font-semibold text-slate-600">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Motivational Banner */}
            <div className="bg-primary rounded-md p-5 text-center">
              <Zap size={24} className="mx-auto mb-3 text-yellow-400" />
              <p className="text-sm font-bold text-white">
                You are in the top <span className="text-yellow-400">15%</span> of learners this
                week!
              </p>
              <p className="text-text mt-1 text-xs text-white/60">
                Keep it up — 3 more lessons to hit your weekly goal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressPage;
