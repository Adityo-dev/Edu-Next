'use client';

import { Bookmark, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import CourseCard from '../(home)/courses/_components/CourseCard/CourseCard';

// Mock data to demonstrate the design
const mockSavedCourses = [
  {
    id: '1',
    title: 'Complete Web Development Course with Jhankar Mahbub',
    instructor: 'Jhankar Mahbub',
    instructorImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=500',
    price: 4500,
    rating: 4.8,
    enrolled: 1200,
    duration: '45h 30m',
    category: 'Development',
    level: 'Beginner',
    language: 'Bangla',
    badge: 'Bestseller',
    certificate: true,
  },
  {
    id: '2',
    title: 'Advanced Figma UI/UX Design for Freelancing',
    instructor: 'Ayman Sadiq',
    instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=500',
    price: 3200,
    rating: 4.9,
    enrolled: 850,
    duration: '22h 15m',
    category: 'Design',
    level: 'Intermediate',
    language: 'Bangla',
    certificate: true,
  },
];

const badgeColors: Record<string, string> = {
  Bestseller: '#f59e0b',
  New: '#3b82f6',
  Trending: '#ec4899',
};

const levelColors: Record<string, string> = {
  Beginner: '#22c55e',
  Intermediate: '#eab308',
  Advanced: '#ef4444',
};

export default function WishlistPage() {
  const [courses, setCourses] = useState(mockSavedCourses);

  const handleRemove = (id: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* ── Hero Section  */}
      <div className="bg-primary mt-20 px-6 py-16 text-center">
        <div className="relative z-10 mx-auto max-w-400 px-6 text-center">
          <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
            My <span className="text-yellow-400">Wishlist</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/75">
            All your saved courses in one place. Keep track of what you want to learn next and
            enroll whenever you are ready.
          </p>
        </div>
      </div>

      {/* ── Content Section  */}
      <section className="py-16">
        <div className="mx-auto max-w-400 px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Saved Courses ({courses.length})</h2>
            <Link
              href="/courses"
              className="text-primary flex items-center gap-2 text-sm font-semibold hover:underline"
            >
              <Search size={16} />
              Discover More
            </Link>
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  viewMode="grid"
                  badgeColors={badgeColors}
                  levelColors={levelColors}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white py-24 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
                <Bookmark size={32} className="text-slate-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-800">Your wishlist is empty</h3>
              <p className="mb-8 max-w-md text-slate-500">
                You haven&apos;t saved any courses yet. Browse our extensive catalog and bookmark
                the ones you want to learn later!
              </p>
              <Link
                href="/courses"
                className="bg-primary rounded-sm px-5 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-[#2a6159] active:scale-95 sm:px-6 sm:py-4"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
