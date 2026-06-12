'use client';

import { BookOpen, CheckCircle, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

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

const skillsData = [
  { skill: 'Web Development', level: 72, color: 'bg-primary' },
  { skill: 'UI/UX Design', level: 45, color: 'bg-blue-400' },
  { skill: 'Digital Marketing', level: 20, color: 'bg-secondary' },
  { skill: 'Freelancing', level: 100, color: 'bg-emerald-400' },
  { skill: 'Graphic Design', level: 100, color: 'bg-purple-400' },
];

const ProgressTabs = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'quizzes' | 'skills'>('courses');

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
        {[
          { key: 'courses' as const, label: 'Course Progress' },
          { key: 'quizzes' as const, label: 'Quiz History' },
          { key: 'skills' as const, label: 'Skills' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 text-sm font-semibold transition-all ${
              activeTab === tab.key ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Course Progress Tab */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          {courseProgress.map((course) => (
            <div
              key={course.id}
              className="dashboard-card-container transition-all hover:border-emerald-100"
            >
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-sm">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

      {/* Quiz History Tab */}
      {activeTab === 'quizzes' && (
        <div className="dashboard-card-container p-0">
          <div className="divide-y divide-slate-100">
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

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="dashboard-card-container">
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
  );
};

export default ProgressTabs;
