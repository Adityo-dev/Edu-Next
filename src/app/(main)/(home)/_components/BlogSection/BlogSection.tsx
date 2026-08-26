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
    title: 'The Future of AI: How Machine Learning is Shaping 2025',
    description:
      'Explore the revolutionary advancements in AI, from generative models to automation, and how to prepare for the AI-driven economy.',
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
    category: 'Artificial Intelligence',
    readTime: '6 min read',
  },
  {
    id: 2,
    title: 'Mastering DevOps: Streamlining CI/CD Pipelines',
    description:
      'A comprehensive guide to continuous integration and deployment, Docker, Kubernetes, and automating your workflow.',
    image:
      'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1000&auto=format&fit=crop',
    category: 'DevOps',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'Cybersecurity Trends You Cannot Ignore',
    description:
      'With digital threats evolving rapidly, discover the most critical security practices to protect your infrastructure.',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    category: 'Security',
    readTime: '5 min read',
  },
  {
    id: 4,
    title: 'Cloud Computing: AWS vs Azure vs GCP',
    description:
      'An in-depth comparison of the top cloud platforms to help you choose the right infrastructure for your next big project.',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
    category: 'Cloud',
    readTime: '8 min read',
  },
  {
    id: 5,
    title: 'Web3 & Blockchain: Beyond Cryptocurrency',
    description:
      'Understand the underlying technology of Web3, smart contracts, and decentralized applications (dApps).',
    image: '/images/web3.jpg',
    category: 'Web3',
    readTime: '6 min read',
  },
  {
    id: 6,
    title: 'Data Science: Turning Raw Data into Insights',
    description:
      'Learn the core principles of data analysis, visualization techniques, and predictive modeling for business growth.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    category: 'Data Science',
    readTime: '7 min read',
  },
  {
    id: 7,
    title: 'Full-Stack Development with Next.js 15',
    description:
      'A deep dive into the latest features of Next.js, React Server Components, and building performant web applications.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    category: 'Development',
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
