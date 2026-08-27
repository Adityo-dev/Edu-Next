'use client';

import CourseCard from '@/app/(main)/courses/_components/CourseCard/CourseCard';
import CourseCardSkeleton from '@/components/main/Skeletons/CourseCardSkeleton/CourseCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCategoriesQuery } from '@/redux/features/categories/categoriesApi';
import { useGetTopRatedCoursesQuery } from '@/redux/features/courseManagement/publicCourse.api';
import { ICourseListItem } from '@/types/courseManagement.types';
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const TopRatedCourses = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingDirection, setLoadingDirection] = useState<'left' | 'right' | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setLoadingDirection(null);
  };

  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery();

  const categoryTabs = useMemo(() => {
    return [
      'All',
      ...(categoriesData?.data
        ?.filter((c) => !c.parentId)
        .slice(0, 3)
        .map((c) => c.name) || []),
    ];
  }, [categoriesData]);

  const { data, isLoading, isFetching } = useGetTopRatedCoursesQuery({
    page: currentPage,
    limit: 12,
    category: activeTab !== 'All' ? activeTab : undefined,
  });

  const displayCourses: ICourseListItem[] = data?.data?.courses || [];
  const totalPages = data?.data?.pagination?.totalPages || 1;

  const handlePrev = () => {
    if (currentPage > 1) {
      setLoadingDirection('left');
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setLoadingDirection('right');
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <section className="overflow-hidden py-12">
      <div className="mx-auto max-w-400 px-4">
        {/* Header */}
        <div className="mb-5 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Top Rated Learning <span className="text-primary italic">Courses</span>
            </h2>
            <p className="text-text-secondary mt-3 max-w-2xl text-base leading-relaxed">
              Our highest-rated courses, loved by thousands of students — handpicked to give you the
              best learning experience.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="no-scrollbar mb-8 overflow-x-auto border-b border-slate-200">
          <ul className="flex min-w-max items-center gap-6">
            {isCategoriesLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <li key={i} className="pb-2">
                    <Skeleton className="h-5 w-24 animate-pulse" />
                  </li>
                ))
              : categoryTabs.map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => handleTabChange(tab)}
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

        {/* Course Area */}
        <div className="relative">
          {/* Left Arrow */}
          {currentPage > 1 && (
            <button
              onClick={handlePrev}
              disabled={isLoading || isFetching}
              className="absolute top-1/2 -left-4 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm border border-orange-200 bg-white text-slate-700 transition-all hover:bg-orange-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 sm:-left-6 md:-left-8"
            >
              {loadingDirection === 'left' && isFetching ? (
                <Loader2 size={20} className="animate-spin text-[#F59E0B]" />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          )}

          {/* Right Arrow */}
          {currentPage < totalPages && (
            <button
              onClick={handleNext}
              disabled={isLoading || isFetching}
              className="absolute top-1/2 -right-4 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm bg-[#F59E0B] text-white shadow-md shadow-orange-200/50 transition-all hover:bg-[#d98c0a] active:scale-95 disabled:cursor-not-allowed disabled:bg-[#F59E0B]/50 disabled:opacity-50 disabled:active:scale-100 sm:-right-6 md:-right-8"
            >
              {loadingDirection === 'right' && isFetching ? (
                <Loader2 size={20} className="animate-spin text-white" />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>
          )}

          <div className="[&_.swiper-pagination-bullet]:bg-primary/30 hover:[&_.swiper-pagination-bullet]:bg-primary/60 [&_.swiper-pagination-bullet-active]:bg-primary! relative [&_.swiper-pagination]:bottom-0! [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet-active]:w-8! [&_.swiper-pagination-bullet-active]:rounded-full!">
            {isLoading || (isFetching && !loadingDirection) ? (
              <div className="flex w-full gap-4 overflow-hidden px-2 sm:gap-5 md:gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[85%] shrink-0 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
                  >
                    <CourseCardSkeleton />
                  </div>
                ))}
              </div>
            ) : displayCourses.length > 0 ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={16}
                slidesPerView={1.15}
                pagination={{ clickable: true }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                breakpoints={{
                  650: { slidesPerView: 2, spaceBetween: 16 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                  1280: { slidesPerView: 4, spaceBetween: 24 },
                }}
                className="px-2! pb-8!"
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
            ) : (
              <div className="mx-2 flex h-40 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-500">
                No courses found in this category.
              </div>
            )}
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-2">
          <Link
            href={
              activeTab === 'All'
                ? '/courses'
                : `/courses?category=${encodeURIComponent(activeTab)}`
            }
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
