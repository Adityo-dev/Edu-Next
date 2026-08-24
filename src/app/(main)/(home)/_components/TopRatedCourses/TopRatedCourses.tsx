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
        <div className="mb-10 text-center md:mb-14">
          <h2 className="mb-3 text-4xl leading-[1.15] font-bold tracking-tight text-slate-900 md:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
            Top Rated <span className="text-primary italic">Courses</span>
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-500 md:text-lg lg:text-base">
            Our highest-rated courses, loved by thousands of students — handpicked to give you the
            best learning experience.
          </p>
          <div className="mt-8">
            <Link
              href={'/courses'}
              className="bg-primary cursor-pointer rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#2a6159] active:scale-95"
            >
              View All Courses
            </Link>
          </div>
        </div>

        {/* Course Carousel */}
        <div className="relative mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <TopRatedCourseCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1.15}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              speed={800}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                800: { slidesPerView: 2.5, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 30 },
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
