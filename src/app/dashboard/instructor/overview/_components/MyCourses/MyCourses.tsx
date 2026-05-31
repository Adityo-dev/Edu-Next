import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CircleDollarSign, Star, Users } from 'lucide-react';

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

const MyCourses = () => {
  return (
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
  );
};

export default MyCourses;
