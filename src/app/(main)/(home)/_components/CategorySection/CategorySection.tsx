'use client';

import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CategoryCard from './_components/CategoryCard/CategoryCard';

import { Skeleton } from '@/components/ui/skeleton';
import { useGetCategoriesQuery } from '@/redux/features/categories/categoriesApi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CategorySection = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery({ nested: true });
  const [isLocked, setIsLocked] = useState(false);

  const categories = data?.data?.filter((cat) => cat.isActive) || [];

  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-400 px-4">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl leading-[1.15] font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl lg:leading-[1.08]">
              Browse by Topic: Find <br className="hidden lg:block" />
              Your Perfect <span className="text-[#F59E0B] italic">Category</span>
            </h2>
          </div>
          <div className="max-w-sm lg:self-end lg:pb-1">
            <p className="text-base leading-relaxed text-slate-500 md:text-lg lg:text-base">
              Explore categories from Web Development to Business — and find the right course to
              grow your skills with EduNext.
            </p>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-95 w-full rounded-md" />
            ))}
          </div>
        ) : isError ? (
          <div className="bg-destructive/5 border-destructive/20 flex flex-col items-center justify-center rounded-2xl border p-10 text-center">
            <AlertCircle className="text-destructive mb-3 h-10 w-10" />
            <h3 className="text-destructive text-lg font-semibold">Failed to load categories</h3>
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-muted/30 border-border flex flex-col items-center justify-center rounded-2xl border p-10 text-center">
            <h3 className="text-lg font-semibold text-slate-700">No categories found</h3>
            <p className="mt-1 text-sm text-slate-500">Categories will appear here once added.</p>
          </div>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              loop={true}
              speed={800}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{ nextEl: '.cat-next', prevEl: '.cat-prev' }}
              pagination={{
                el: '.cat-pagination-bar',
                type: 'progressbar',
                progressbarFillClass: 'swiper-pagination-progressbar-fill',
              }}
              breakpoints={{
                0: { slidesPerView: 1.15, spaceBetween: 16 },
                800: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 30 },
              }}
              watchOverflow={true}
              onLock={() => setIsLocked(true)}
              onUnlock={() => setIsLocked(false)}
              onInit={(swiper) => setIsLocked(swiper.isLocked)}
              onBreakpoint={(swiper) => setIsLocked(swiper.isLocked)}
            >
              {categories.map((cat, index) => {
                const isYellowStyle = index % 2 !== 0;

                return (
                  <SwiperSlide key={cat?._id}>
                    <CategoryCard cat={cat} isYellowStyle={isYellowStyle} />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Progress Bar & Navigation */}
            <div
              className={`mt-6 flex w-full items-center justify-between gap-[10%] ${isLocked ? 'hidden' : ''}`}
            >
              <div className="cat-pagination-bar relative h-1.25 w-full flex-1 overflow-hidden rounded-full bg-slate-100"></div>

              <div className="flex items-center gap-4">
                <button className="cat-prev flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm border border-orange-200 text-[#2D3134] transition-all hover:bg-orange-50 active:scale-95">
                  <ChevronLeft size={24} />
                </button>
                <button className="cat-next flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm bg-[#F59E0B] text-white shadow-orange-200/50 transition-all hover:bg-[#d98c0a] active:scale-95">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .cat-pagination-bar.swiper-pagination-progressbar {
          position: relative !important;
          width: 100% !important;
          height: 5px !important;
          background: #f1f5f9 !important;
          top: 0 !important;
          left: 0 !important;
          display: block !important;
        }

        .cat-pagination-bar .swiper-pagination-progressbar-fill {
          background: #f59e0b !important;
          height: 100% !important;
          border-radius: 99px !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          transform-origin: left center !important;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
      `,
        }}
      />
    </section>
  );
};

export default CategorySection;
