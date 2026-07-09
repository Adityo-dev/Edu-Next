'use client';

import CourseDetailsHero from './_components/CourseDetailsHero/CourseDetailsHero';
import ReviewsAndAbout from './_components/ReviewsAndAbout/ReviewsAndAbout';
import SkillsAndTeacher from './_components/SkillsAndTeacher/SkillsAndTeacher';
import StickyBuyCard from './_components/StickyBuyCard/StickyBuyCard';

import { useGetCourseBySlugQuery } from '@/redux/features/courseManagement/publicCourse.api';

import { use } from 'react';

// ─── Mock Data
const ratingBreakdown = [
  { stars: 5, percent: 72 },
  { stars: 4, percent: 18 },
  { stars: 3, percent: 6 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 1 },
];

// ─── Component
const CourseDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data, isLoading, isError } = useGetCourseBySlugQuery(id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
        <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] text-xl font-semibold">
        Course not found
      </div>
    );
  }

  const apiCourse = data.data;

  // Shadow the global mock `course` variable with the real data
  const course = {
    id: apiCourse._id,
    title: apiCourse.title,
    subtitle: apiCourse.subtitle,
    instructor: {
      name:
        `${apiCourse.instructor?.firstName || ''} ${apiCourse.instructor?.lastName || ''}`.trim() ||
        'Instructor',
      title: apiCourse.instructor?.bio || 'Instructor',
      image: apiCourse.instructor?.avatar || 'https://i.pravatar.cc/150',
      students: apiCourse.instructor?.totalStudents?.toLocaleString() || '0',
      courses: apiCourse.instructor?.totalCourses || 0,
      rating: apiCourse.instructor?.rating || 0,
      bio: apiCourse.instructor?.bio || '',
    },
    category: apiCourse.category || 'Course',
    level: apiCourse.level || 'Beginner',
    language: apiCourse.language || 'English',
    rating: apiCourse.rating || 0,
    totalReviews: apiCourse.totalReviews || 0,
    enrolled: apiCourse.enrolledCount?.toLocaleString() || '0',
    duration: apiCourse.totalDuration || '0 mins',
    lessons: apiCourse.lessonsCount || 0,
    lastUpdated: apiCourse.updatedAt
      ? new Date(apiCourse.updatedAt).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })
      : 'Recently',
    price: apiCourse.price || 0,
    badge: apiCourse.badge || '',
    certificate: apiCourse.hasCertificate,
    image:
      apiCourse.thumbnail ||
      'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000',
    whatYouLearn: Array.isArray(apiCourse.whatYouLearn)
      ? `<ul>${apiCourse.whatYouLearn.map((i: string) => `<li>${i}</li>`).join('')}</ul>`
      : apiCourse.whatYouLearn || '',
    requirements: Array.isArray(apiCourse.requirements)
      ? `<ul>${apiCourse.requirements.map((i: string) => `<li>${i}</li>`).join('')}</ul>`
      : apiCourse.requirements || '',
    curriculum: (apiCourse.sections || []).map(
      (sec: {
        title: string;
        lessons: { title: string; duration: string; isFree: boolean }[];
      }) => ({
        section: sec.title || 'Section',
        lessons: (sec.lessons || []).map((lesson) => ({
          title: lesson.title || 'Lesson',
          duration: lesson.duration || '0:00',
          free: lesson.isFree || false,
        })),
      }),
    ),
    reviews: [
      {
        id: 1,
        name: 'Sumaiya Akter',
        image: 'https://i.pravatar.cc/150?u=sumaiya',
        rating: 5,
        date: 'March 2025',
        text: 'This is the best course I have ever taken. The instructor explains everything clearly and the projects are very practical. Highly recommended!',
      },
    ],
    relatedCourses: [
      {
        id: 2,
        title: 'UI/UX Design Masterclass',
        price: 1800,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=600',
        instructor: 'Farhan Hossain',
      },
    ],
  };

  const totalLessons = course.curriculum.reduce(
    (acc: number, s: { lessons: { title: string; duration: string; free: boolean }[] }) =>
      acc + s.lessons.length,
    0,
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <CourseDetailsHero course={course} totalLessons={totalLessons} />

      {/* ── Main Content  */}
      <div className="mx-auto max-w-400 px-6 py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* ── Left: Course Content  */}
          <div className="min-w-0 flex-1 space-y-6">
            <SkillsAndTeacher course={course} totalLessons={totalLessons} />
            <ReviewsAndAbout course={course} ratingBreakdown={ratingBreakdown} />
          </div>

          {/* ── Right: Sticky Buy Card  */}
          <StickyBuyCard course={course} totalLessons={totalLessons} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
