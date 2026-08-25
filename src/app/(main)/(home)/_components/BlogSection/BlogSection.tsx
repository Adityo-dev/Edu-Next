'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BlogCard, { IBlogPost } from './_components/BlogCard';

const additionalBlogPosts: IBlogPost[] = [
  {
    id: 1,
    title: 'How to Start Freelancing in Bangladesh',
    description:
      'A complete beginner guide to starting your freelancing career on Fiverr and Upwork from Bangladesh.',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=1000',
    category: 'Freelancing',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Top 5 In-Demand Skills in 2025',
    description:
      'Discover which digital skills are most wanted by employers and clients globally in 2025.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000',
    category: 'Career',
    readTime: '4 min read',
  },
  {
    id: 3,
    title: 'How to Learn UI/UX Design from Scratch',
    description:
      'A step-by-step roadmap for beginners to master UI/UX design using Figma and modern tools.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1000',
    category: 'Design',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'Web Development Roadmap for Beginners',
    description:
      'Everything you need to know to go from zero to a job-ready web developer in 2025.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000',
    category: 'Development',
    readTime: '7 min read',
  },
  {
    id: 5,
    title: 'Why Digital Marketing is the Future',
    description:
      'Learn why businesses in Bangladesh are investing heavily in digital marketing and how you can benefit.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1000',
    category: 'Marketing',
    readTime: '5 min read',
  },
];

const BlogSection = () => {
  return (
    <section className="overflow-hidden py-12">
      <div className="mx-auto max-w-400 px-4">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Learn More from Our <span className="text-primary">Blog</span>
            </h2>
            <p className="text-text-secondary mt-3 max-w-lg text-base leading-relaxed">
              Stay updated with the latest tips, career advice, and learning strategies from our
              expert instructors.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="blog-prev text-text-secondary flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border border-orange-200 transition-all hover:bg-orange-50 active:scale-95">
              <ChevronLeft size={20} />
            </button>
            <button className="blog-next bg-secondary flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm text-white transition-all hover:bg-[#d98c0a] active:scale-95">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <div className="[&_.swiper-pagination-bullet]:bg-primary/30 hover:[&_.swiper-pagination-bullet]:bg-primary/60 [&_.swiper-pagination-bullet-active]:bg-primary! relative [&_.swiper-pagination]:bottom-0! [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet-active]:w-8! [&_.swiper-pagination-bullet-active]:rounded-full!">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            navigation={{ nextEl: '.blog-next', prevEl: '.blog-prev' }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-8!"
          >
            {additionalBlogPosts.map((post) => (
              <SwiperSlide key={post.id} className="flex h-auto!">
                <BlogCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
