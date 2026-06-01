import React from 'react';
import Image from 'next/image';
import { CircleDollarSign, Eye, Star, Users } from 'lucide-react';

const courseAnalytics = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    students: 320,
    revenue: 18000,
    views: 2400,
    rating: 4.9,
    completion: 68,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600',
  },
  {
    id: 2,
    title: 'React.js Advanced Masterclass',
    students: 210,
    revenue: 12600,
    views: 1800,
    rating: 4.8,
    completion: 55,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600',
  },
  {
    id: 3,
    title: 'JavaScript ES6+ Fundamentals',
    students: 180,
    revenue: 9000,
    views: 1200,
    rating: 4.7,
    completion: 72,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600',
  },
];

const CoursePerformance = () => {
  return (
    <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
      <h2 className="mb-5 text-lg font-bold">Course Performance</h2>
      <div className="space-y-4">
        {courseAnalytics.map((course) => (
          <div
            key={course.id}
            className="flex flex-col gap-4 rounded-sm border border-slate-100 p-4 transition-all hover:border-emerald-100 sm:flex-row sm:items-center"
          >
            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm">
              <Image src={course.image} alt={course.title} fill className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-2 line-clamp-1 font-bold">{course.title}</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 sm:grid-cols-4">
                <span className="flex items-center gap-1">
                  <Users size={11} />
                  {course.students} students
                </span>
                <span className="flex items-center gap-1">
                  <CircleDollarSign size={11} />৳{course.revenue.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={11} />
                  {course.views.toLocaleString()} views
                </span>
                <span className="flex items-center gap-1">
                  <Star size={11} fill="#ffc107" color="#ffc107" />
                  {course.rating}
                </span>
              </div>
            </div>
            <div className="w-full sm:w-32">
              <p className="text-text-secondary mb-1 text-xs">Completion Rate</p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${course.completion}%` }}
                />
              </div>
              <p className="text-primary mt-1 text-xs font-bold">{course.completion}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePerformance;
