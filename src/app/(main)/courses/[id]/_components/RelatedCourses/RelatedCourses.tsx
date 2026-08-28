/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetRelatedCoursesQuery } from '@/redux/features/courseManagement/publicCourse.api';
import CourseCard from '../../../_components/CourseCard/CourseCard';
import CourseCardSkeleton from '@/components/main/Skeletons/CourseCardSkeleton/CourseCardSkeleton';
import { useMemo } from 'react';

const badgeColors: Record<string, string> = {
  'Best Seller': '#eab308',
  'Top Rated': '#34796f',
  New: '#34d399',
};

const levelColors: Record<string, string> = {
  Beginner: '#34796f',
  Intermediate: '#ca8a04',
  Advanced: '#ef4444',
};

interface RelatedCoursesProps {
  slug: string;
}

export default function RelatedCourses({ slug }: RelatedCoursesProps) {
  const { data, isLoading, isError } = useGetRelatedCoursesQuery(slug);

  const relatedCourses = useMemo(() => {
    const apiCourses = data?.data?.courses || [];
    return apiCourses.map((c: any) => ({
      id: c.slug || c._id,
      title: c.title,
      image: c.thumbnail,
      badge: c.badge || '', // From api if available
      category: c.category,
      subCategory: c.subCategory,
      level: c.level,
      language: c.language,
      instructor: c.instructor ? c.instructor.fullName : 'Unknown',
      instructorImage: c.instructor?.avatar,
      rating: c.rating || 0,
      enrolled: c.enrolledCount || 0,
      duration: c.totalDuration || '1h 0m',
      price: c.price,
      estimatedPrice: c.estimatedPrice,
      certificate: c.hasCertificate || false,
    }));
  }, [data?.data?.courses]);

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Related Courses</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError || relatedCourses.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 border-t border-slate-200 pt-12">
      <h2 className="mb-6 text-2xl font-bold">Related Courses</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {relatedCourses.map((course: any) => (
          <CourseCard
            key={course.id}
            course={course}
            badgeColors={badgeColors}
            levelColors={levelColors}
          />
        ))}
      </div>
    </div>
  );
}
