import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const CoursesHeader = () => {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-text-primary text-2xl font-black">My Courses</h1>
        <p className="text-text-secondary mt-1 text-sm">Manage and track all your courses.</p>
      </div>
      <Link
        href="/dashboard/instructor/courses/create"
        className="bg-primary flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#2a6159]"
      >
        <Plus size={16} />
        Create New Course
      </Link>
    </div>
  );
};

export default CoursesHeader;
