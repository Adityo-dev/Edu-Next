'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600',
    lastLesson: 'SEO Fundamentals',
  },
];

const ContinueLearning = () => {
  return (
    <div className="dashboard-card-container">
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
              <Image
                src={course.image}
                alt={course.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 240px"
              />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <h4 className="group-hover:text-primary mb-0.5 truncate text-sm font-bold transition-colors">
                {course.title}
              </h4>
              <p className="text-text-secondary mb-2 text-xs">{course.instructor}</p>
              <p className="text-text-secondary mb-2 truncate text-xs">
                Last: <span className="font-medium text-slate-600">{course.lastLesson}</span>
              </p>

              {/* Progress Bar */}
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="bg-primary h-full rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="text-primary shrink-0 text-xs font-bold">{course.progress}%</span>
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
  );
};

export default ContinueLearning;
