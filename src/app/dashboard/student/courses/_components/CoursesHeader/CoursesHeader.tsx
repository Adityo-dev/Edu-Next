'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import { BookOpen } from 'lucide-react';

const CoursesHeader = () => {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <SectionHeader
        title="My Courses"
        description="Track your learning progress and continue where you left off."
      />

      <DynamicActionButton
        label="Browse More Courses"
        href="/courses"
        showIcon
        icon={BookOpen}
        className="h-11!"
      />
    </div>
  );
};

export default CoursesHeader;
