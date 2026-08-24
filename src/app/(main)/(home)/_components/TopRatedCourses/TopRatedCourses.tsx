'use client';

import Link from 'next/link';
import { useGetTopRatedCoursesQuery } from '@/redux/features/courseManagement/publicCourse.api';
import TopRatedCourseCardSkeleton from '@/components/dashboard/Skeletons/TopRatedCourseCardSkeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import TopRatedCourseCard from './_components/TopRatedCourseCard/TopRatedCourseCard';

const TopRatedCourses = () => {
  const { data, isLoading } = useGetTopRatedCoursesQuery();
  const courses = data?.data?.courses || [];
  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="mx-auto max-w-400 px-6">
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="mb-3 text-5xl leading-tight font-bold tracking-tight">
              Top Rated <span className="text-primary">Courses</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Our highest-rated courses, loved by thousands of students — handpicked to give you the
              best learning experience.
            </p>
          </div>
          <Link
            href={'/courses'}
            className="bg-primary mt-6 cursor-pointer rounded-sm px-6 py-3 font-medium text-white transition-all hover:bg-[#2a6159] active:scale-95 md:mt-0"
          >
            All Courses
          </Link>
        </div>

        {/* Course Carousel */}
        <div className="relative mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <TopRatedCourseCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="!pb-12"
            >
              {courses.map((course) => (
                <SwiperSlide key={course?._id} className="h-auto">
                  <TopRatedCourseCard course={course} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopRatedCourses;
