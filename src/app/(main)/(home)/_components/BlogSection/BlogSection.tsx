'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
// Swiper imports
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const additionalBlogPosts = [
  {
    id: 5,
    title: 'Mastering React Server Components',
    description:
      'Deep dive into the future of Next.js and React with server-side rendering patterns and performance tips.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000',
  },
  {
    id: 6,
    title: 'The Art of UI Micro-Animations',
    description:
      'Learn how small animations can significantly improve user experience and make your apps feel premium.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000',
  },
  {
    id: 7,
    title: 'Productivity Hacks for Developers',
    description:
      'Streamline your workflow with these essential tools and mindset shifts for modern software engineers.',
    image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1000',
  },
  {
    id: 8,
    title: 'Cloud Computing Essentials',
    description:
      'Understanding AWS, Azure, and Google Cloud basics for scaling your next big application.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000',
  },
  {
    id: 9,
    title: 'Cybersecurity Best Practices',
    description:
      'Protect your data and user privacy by implementing robust security measures in your web projects.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000',
  },
];

const BlogSection = () => {
  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-400 px-6">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-5xl leading-tight font-bold text-[#0F172A]">
              Dive Into Our <span className="text-primary">Blogs</span> Posts
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-slate-500">
              Discover a wealth of knowledge, tips, and expert insights to enhance your learning
              journey in our blog posts.
            </p>
          </div>

          {/* Custom Slider Buttons */}
          <div className="flex gap-4">
            <button className="blog-prev flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm border border-orange-200 text-orange-500 transition-all hover:bg-orange-50 active:scale-90">
              <ChevronLeft size={24} />
            </button>
            <button className="blog-next flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm bg-[#F59E0B] text-white shadow-orange-100 transition-all hover:bg-[#d98c0a] active:scale-90">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            navigation={{
              nextEl: '.blog-next',
              prevEl: '.blog-prev',
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {additionalBlogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <div className="group relative">
                  <div className="relative h-105 w-full overflow-hidden rounded-md border border-slate-100 shadow-xl transition-all duration-300 group-hover:shadow-emerald-100/50">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-4 left-0 w-full translate-y-4 p-6 transition-all duration-300 group-hover:translate-y-0">
                      <h3 className="mb-2 text-xl leading-snug font-bold text-white">
                        {post.title}
                      </h3>
                      <p className="mb-5 line-clamp-2 text-sm text-slate-300 opacity-100 transition-opacity duration-300">
                        {post.description}
                      </p>
                      <button className="bg-primary transform rounded-sm px-5 py-2.5 text-xs font-medium text-white shadow-lg shadow-emerald-900/20 transition-all hover:bg-[#2a6159] active:scale-95">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
