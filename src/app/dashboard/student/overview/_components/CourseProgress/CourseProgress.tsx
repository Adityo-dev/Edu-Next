'use client';

import { Star } from 'lucide-react';

const continueLearning = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    progress: 72,
    totalLessons: 48,
    completedLessons: 34,
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass with Figma',
    progress: 45,
    totalLessons: 36,
    completedLessons: 16,
  },
  {
    id: 3,
    title: 'Digital Marketing from Zero to Hero',
    progress: 20,
    totalLessons: 30,
    completedLessons: 6,
  },
];

const CourseProgress = () => {
  return (
    <div className="dashboard-card-container">
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
  );
};

export default CourseProgress;
