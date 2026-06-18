'use client';

import { ArrowRight, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const additionalBlogPosts = [
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
    <section className="overflow-hidden bg-[#F9FAFB] py-20">
      <div className="mx-auto max-w-400 px-6">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-4xl leading-tight font-bold tracking-tight md:text-5xl">
              Learn More from Our <span className="text-primary">Blog</span>
            </h2>
            <p className="text-text-secondary mt-4 max-w-lg text-lg leading-relaxed">
              Stay updated with the latest tips, career advice, and learning strategies from our
              expert instructors.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="blog-prev text-text-secondary flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm border border-orange-200 transition-all hover:bg-orange-50 active:scale-95">
              <ChevronLeft size={24} />
            </button>
            <button className="blog-next bg-secondary flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm text-white transition-all hover:bg-[#d98c0a] active:scale-95">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          navigation={{ nextEl: '.blog-next', prevEl: '.blog-prev' }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {additionalBlogPosts.map((post) => (
            <SwiperSlide key={post.id}>
              <div className="group cursor-pointer overflow-hidden rounded-md bg-white shadow-xs transition-all duration-300 hover:shadow-md hover:shadow-emerald-100/50">
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Category */}
                  <span className="bg-primary absolute top-4 left-4 rounded-sm px-3 py-1 text-xs font-bold text-white">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Read Time */}
                  <div className="text-text-secondary mb-3 flex items-center gap-1.5">
                    <Clock size={13} />
                    <span className="text-xs font-medium">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="group-hover:text-primary mb-3 line-clamp-2 text-lg leading-snug font-bold transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary mb-6 line-clamp-2 text-sm leading-relaxed">
                    {post.description}
                  </p>

                  {/* Divider */}
                  <div className="mb-4 h-px w-full bg-slate-100" />

                  {/* Read More */}
                  <div className="flex items-center justify-between">
                    <span className="text-primary text-sm font-bold">Read Article</span>
                    <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BlogSection;
