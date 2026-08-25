'use client';

import CourseCard from '@/app/(main)/courses/_components/CourseCard/CourseCard';
import CourseCardSkeleton from '@/components/main/Skeletons/CourseCardSkeleton/CourseCardSkeleton';
import { useGetTopRatedCoursesQuery } from '@/redux/features/courseManagement/publicCourse.api';
import { ICourseListItem } from '@/types/courseManagement.types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const CATEGORIES = ['All', 'Web Development', 'Digital Marketing', 'Graphic Design', 'Business'];

const TopRatedCourses = () => {
  const { data, isLoading } = useGetTopRatedCoursesQuery();
  const [activeTab, setActiveTab] = useState('All');

  const allCourses: ICourseListItem[] = data?.data?.courses || [];

  // Basic mock filtering based on active tab. For real implementation,
  // ensure the backend returns the category data or fetches by category.
  const filteredCourses =
    activeTab === 'All'
      ? allCourses
      : allCourses.filter(
          (course) =>
            // @ts-expect-error category might not be fully typed in ICourseListItem if not populated
            course?.category?.name?.toLowerCase().includes(activeTab.toLowerCase()) ||
            // fallback to checking title if category isn't populated
            course?.title?.toLowerCase().includes(activeTab.toLowerCase()),
        );

  // If filtering results in 0, fallback to all courses to prevent empty state in demo
  const displayCourses = filteredCourses.length > 0 ? filteredCourses : allCourses;

  return (
    <section className="mb-10 overflow-hidden bg-slate-50 py-12">
      <div className="mx-auto max-w-400 px-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Top Rated Learning <span className="text-primary italic">Courses</span>
          </h2>
          <p className="text-text-secondary mt-3 max-w-2xl text-base leading-relaxed">
            Our highest-rated courses, loved by thousands of students — handpicked to give you the
            best learning experience.
          </p>
        </div>

        {/* Tabs */}
        <div className="no-scrollbar mb-8 overflow-x-auto border-b border-slate-200">
          <ul className="flex min-w-max items-center gap-6">
            {CATEGORIES.map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`focus-visible:text-primary relative cursor-pointer pb-2 text-sm font-semibold transition-colors duration-300 outline-none ${
                    activeTab === tab ? 'text-primary' : 'hover:text-primary text-slate-500'
                  }`}
                >
                  {tab}
                  <span
                    className={`bg-primary absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-out ${
                      activeTab === tab ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Course Carousel */}
        <div className="relative">
          {isLoading ? (
            <div className="flex w-full gap-4 overflow-hidden sm:gap-5 md:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[85%] shrink-0 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
                >
                  <CourseCardSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <Swiper
              key={activeTab} // Force re-render on tab change to reset swiper state
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1.15}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              breakpoints={{
                650: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 24 },
              }}
              className="pb-4!"
            >
              {displayCourses.map((course) => (
                <SwiperSlide key={course?._id} className="h-auto">
                  <CourseCard
                    course={{
                      ...course,
                      id: course?._id,
                      image: course?.thumbnail,
                      enrolled: course?.enrolledCount || 0,
                      instructor: course?.instructor?.fullName,
                      instructorImage: course?.instructor?.avatar,
                      duration: course?.totalDuration || 'Course',
                      level: course?.level || 'All Levels',
                      language: course?.language || 'Bengali',
                    }}
                    badgeColors={{
                      Bestseller: '#f59e0b',
                      'Hot & New': '#ef4444',
                      'Highest Rated': '#3b82f6',
                    }}
                    levelColors={{
                      Beginner: '#22c55e',
                      Intermediate: '#eab308',
                      Advanced: '#ef4444',
                      'All Levels': '#6366f1',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Footer Link */}
        <div className="mt-2">
          <Link
            href="/courses"
            className="group text-primary inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-[#2a6159]"
          >
            <span className="relative">
              Show all {activeTab !== 'All' ? activeTab : ''} courses
              <span className="bg-primary absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .swiper-pagination-bullet-active {
          background-color: #34796f !important;
        }
        /* Hide scrollbar for tabs */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </section>
  );
};

export default TopRatedCourses;
