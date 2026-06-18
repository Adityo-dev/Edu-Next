'use client';

import { BookOpen } from 'lucide-react';
import Link from 'next/link';

const CoursesHeader = () => {
  return (
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
  );
};

export default CoursesHeader;
