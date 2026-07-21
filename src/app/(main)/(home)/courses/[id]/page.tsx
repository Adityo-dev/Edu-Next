'use client';

import CourseCurriculum from './_components/CourseCurriculum/CourseCurriculum';
import CourseDetailsHero from './_components/CourseDetailsHero/CourseDetailsHero';
import ReviewsAndAbout from './_components/ReviewsAndAbout/ReviewsAndAbout';
import SkillsAndTeacher from './_components/SkillsAndTeacher/SkillsAndTeacher';
import StickyBuyCard from './_components/StickyBuyCard/StickyBuyCard';

import { Skeleton } from '@/components/ui/skeleton';
import { useGetCourseBySlugQuery } from '@/redux/features/courseManagement/publicCourse.api';

import { use } from 'react';

// ─── Component
const CourseDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data, isLoading, isError } = useGetCourseBySlugQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        {/* Hero Skeleton */}
        <div className="relative overflow-hidden pt-20">
          <div className="absolute inset-0 z-0 bg-[#0f2724]" />
          <div className="relative z-10 mx-auto max-w-400 px-6 py-16">
            <div className="max-w-3xl">
              {/* Badges */}
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-sm bg-white/20" />
                <Skeleton className="h-6 w-24 rounded-sm bg-white/20" />
                <Skeleton className="h-6 w-24 rounded-sm bg-white/20" />
              </div>

              {/* Title */}
              <Skeleton className="mb-2 h-10 w-full bg-white/20 md:h-12" />
              <Skeleton className="mb-4 h-10 w-3/4 bg-white/20 md:h-12" />

              {/* Subtitle */}
              <Skeleton className="mb-2 h-4 w-full max-w-2xl bg-white/20" />
              <Skeleton className="mb-7 h-4 w-5/6 max-w-2xl bg-white/20" />

              {/* Rating */}
              <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Skeleton className="h-4 w-48 bg-white/20" />
                <span className="text-sm text-white/20">•</span>
                <Skeleton className="h-4 w-40 bg-white/20" />
                <span className="text-sm text-white/20">•</span>
                <Skeleton className="h-4 w-32 bg-white/20" />
              </div>

              {/* Info Pills */}
              <div className="mb-8 flex flex-wrap gap-2">
                <Skeleton className="h-7 w-24 rounded-sm bg-white/20" />
                <Skeleton className="h-7 w-20 rounded-sm bg-white/20" />
                <Skeleton className="h-7 w-28 rounded-sm bg-white/20" />
                <Skeleton className="h-7 w-36 rounded-sm bg-white/20" />
                <Skeleton className="h-7 w-32 rounded-sm bg-white/20" />
              </div>

              {/* Instructor */}
              <div className="flex w-fit items-center gap-3 rounded-sm border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <Skeleton className="h-12 w-12 shrink-0 rounded-full border-2 border-white/20 bg-white/20" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-16 bg-white/20" />
                  <Skeleton className="h-4 w-24 bg-white/20" />
                  <Skeleton className="h-3 w-32 bg-white/20" />
                </div>
                <div className="ml-4 flex items-center gap-4 border-l border-white/10 pl-4">
                  <div className="space-y-1.5 text-center">
                    <Skeleton className="h-4 w-10 bg-white/20" />
                    <Skeleton className="h-3 w-12 bg-white/20" />
                  </div>
                  <div className="space-y-1.5 text-center">
                    <Skeleton className="h-4 w-10 bg-white/20" />
                    <Skeleton className="h-3 w-12 bg-white/20" />
                  </div>
                  <div className="space-y-1.5 text-center">
                    <Skeleton className="h-4 w-10 bg-white/20" />
                    <Skeleton className="h-3 w-12 bg-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="mx-auto max-w-400 px-6 py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Left Content */}
            <div className="min-w-0 flex-1 space-y-6">
              {/* Description */}
              <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
                <Skeleton className="mb-4 h-6 w-48" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-3/4" />
                <Skeleton className="mb-2 h-4 w-5/6" />
              </div>

              {/* Skills/What you'll learn */}
              <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
                <Skeleton className="mb-4 h-6 w-48" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-3/4" />
                <Skeleton className="mb-2 h-4 w-5/6" />
              </div>

              {/* Requirements */}
              <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
                <Skeleton className="mb-4 h-6 w-40" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-3/4" />
              </div>

              {/* Instructor */}
              <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
                <Skeleton className="mb-6 h-6 w-48" />
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                  <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
                  <div className="w-full">
                    <Skeleton className="mx-auto mb-2 h-5 w-32 sm:mx-0" />
                    <Skeleton className="mx-auto mb-4 h-4 w-48 sm:mx-0" />
                    <div className="mb-4 flex flex-wrap justify-center gap-4 sm:justify-start">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="mt-2 h-4 w-3/4" />
                  </div>
                </div>
              </div>

              {/* Curriculum */}
              <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
                <div className="mb-3 flex items-center justify-between">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-14 w-full rounded-sm" />
                  <Skeleton className="h-14 w-full rounded-sm" />
                  <Skeleton className="h-14 w-full rounded-sm" />
                  <Skeleton className="h-14 w-full rounded-sm" />
                </div>
              </div>

              {/* Reviews and About */}
              <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
                <Skeleton className="mb-6 h-6 w-32" />
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="flex shrink-0 flex-col items-center justify-center rounded-sm bg-slate-50 p-6 md:w-48 md:p-8">
                    <Skeleton className="mb-2 h-12 w-20" />
                    <Skeleton className="mb-2 h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Sticky Card */}
            <aside className="w-full lg:sticky lg:top-24 lg:w-96 lg:shrink-0">
              <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
                <Skeleton className="h-48 w-full rounded-sm" />
                <div className="pt-4">
                  <Skeleton className="mb-5 h-8 w-24" />
                  <Skeleton className="h-12 w-full rounded-sm" />
                  <div className="mt-3 mb-6 flex gap-4">
                    <Skeleton className="h-11 flex-1 rounded-sm" />
                    <Skeleton className="h-11 flex-1 rounded-sm" />
                  </div>
                  <Skeleton className="mb-5 h-px w-full" />
                  <Skeleton className="mb-4 h-5 w-40" />
                  <ul className="space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </ul>
                  <Skeleton className="my-4 h-px w-full" />
                  <Skeleton className="h-20 w-full rounded-sm" />
                </div>
              </div>
            </aside>
          </div>
        </div>
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

  const course = {
    id: apiCourse._id,
    title: apiCourse.title,
    subtitle: apiCourse.subtitle,
    description: apiCourse.description || '',
    instructor: {
      name: apiCourse.instructor?.fullName || 'Instructor',
      title: apiCourse.instructor?.bio || 'Instructor',
      image: apiCourse.instructor?.avatar || 'https://i.pravatar.cc/150',
      students: apiCourse.instructor?.totalStudents?.toLocaleString() || '0',
      courses: apiCourse.instructor?.totalCourses || 0,
      rating: apiCourse.instructor?.rating || 0,
      bio: apiCourse.instructor?.bio || '',
      badge: apiCourse.instructor?.badge || '',
      experienceYears: apiCourse.instructor?.experienceYears || 0,
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
        lessons: { title: string; duration: string; isFree: boolean; videoUrl?: string }[];
      }) => ({
        section: sec.title || 'Section',
        lessons: (sec.lessons || []).map((lesson) => ({
          title: lesson.title || 'Lesson',
          duration: lesson.duration || '0:00',
          free: lesson.isFree || false,
          videoUrl: lesson.videoUrl || '',
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
    <section>
      <CourseDetailsHero course={course} totalLessons={totalLessons} />

      {/* ── Main Content  */}
      <div className="mx-auto max-w-400 px-4 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* ── Left: Course Content  */}
          <div className="min-w-0 flex-1 space-y-6">
            <SkillsAndTeacher course={course} />
            <CourseCurriculum
              curriculum={course.curriculum}
              totalLessons={totalLessons}
              duration={course.duration}
            />
            <ReviewsAndAbout course={course} />
          </div>

          {/* ── Right: Sticky Buy Card  */}
          <StickyBuyCard course={course} totalLessons={totalLessons} />
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsPage;
