'use client';

import { ArrowUpRight, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useGetCategoriesQuery } from '@/redux/features/categories/categoriesApi';
import { Skeleton } from '@/components/ui/skeleton';

const CategorySection = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery({ nested: true });
  const [isLocked, setIsLocked] = useState(false);

  const categories = data?.data?.filter((cat) => cat.isActive) || [];

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-400 px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row">
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-tight font-bold tracking-tight md:text-5xl">
              Browse by Topic: Find <br />
              Your Perfect <span className="text-secondary italic">Category</span>
            </h2>
          </div>
          <div className="max-w-sm md:self-end">
            <p className="text-text-secondary text-lg leading-relaxed">
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
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{ nextEl: '.cat-next', prevEl: '.cat-prev' }}
              pagination={{
                el: '.cat-pagination-bar',
                type: 'progressbar',
                progressbarFillClass: 'swiper-pagination-progressbar-fill',
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1440: { slidesPerView: 4 },
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
                    <div
                      className={`group relative flex h-95 w-full cursor-pointer flex-col overflow-hidden rounded-md p-6 shadow-sm transition-all duration-500 ${
                        isYellowStyle ? 'bg-[#FEF5E7]' : 'bg-[#EEF5F5]'
                      }`}
                    >
                      {isYellowStyle ? (
                        <>
                          <div className="flex w-full grow flex-col">
                            <h3 className="mb-2.5 text-2xl font-semibold">{cat?.name}</h3>
                            <p className="text-text-secondary line-clamp-3 w-full leading-relaxed">
                              {cat?.description ||
                                'Explore courses in this category to enhance your skills and knowledge.'}
                            </p>
                          </div>
                          <div className="flex items-end justify-between">
                            <div className="bg-primary flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-500 group-hover:rotate-45">
                              <ArrowUpRight size={24} />
                            </div>
                            {/* Pixel Perfect Cut Image */}
                            <div className="relative h-40 w-40 overflow-hidden rounded-tl-[5rem] rounded-tr-md rounded-br-3xl rounded-bl-3xl border-[6px] border-white/60 shadow-xl shadow-black/5">
                              {cat?.image && (
                                <Image
                                  src={cat.image}
                                  alt={cat?.name}
                                  fill
                                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        /* Data Analytics Style (Teal Card) */
                        <>
                          <div className="flex justify-between">
                            <div className="bg-primary flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-500 group-hover:rotate-45">
                              <ArrowUpRight size={24} />
                            </div>

                            <div className="relative h-40 w-40 overflow-hidden rounded-tl-[5rem] rounded-tr-md rounded-br-3xl rounded-bl-3xl border-[6px] border-white/60 shadow-xl shadow-black/5">
                              {cat?.image && (
                                <Image
                                  src={cat.image}
                                  alt={cat?.name}
                                  fill
                                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                              )}
                            </div>
                          </div>

                          <div className="mt-auto">
                            <h3 className="mb-2.5 text-2xl font-semibold">{cat?.name}</h3>
                            <p className="text-text-secondary line-clamp-3 leading-relaxed">
                              {cat?.description ||
                                'Explore courses in this category to enhance your skills and knowledge.'}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Progress Bar & Navigation */}
            <div
              className={`mt-8 flex w-full items-center justify-between gap-[10%] ${isLocked ? 'hidden' : ''}`}
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
