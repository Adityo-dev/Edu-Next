'use client';

import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const coursesData = [
  {
    id: 1,
    title: 'Web Development',
    price: '$30.00',
    category: 'Tech',
    img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    price: '$32.00',
    category: 'Design',
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=600',
    active: true,
  },
  {
    id: 3,
    title: 'Digital Marketing',
    price: '$25.00',
    category: 'Marketing',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600',
  },
  {
    id: 4,
    title: 'Creative Writing',
    price: '$20.00',
    category: 'Writing',
    img: 'https://images.unsplash.com/photo-1543286386-713bcd549651?q=80&w=600',
  },
  {
    id: 5,
    title: 'Leadership Skills',
    price: '$45.00',
    category: 'Business',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600',
  },
  {
    id: 6,
    title: 'Data Analytics',
    price: '$35.00',
    category: 'Analytics',
    img: 'https://images.unsplash.com/photo-1551288049-bbda38a594a0?q=80&w=600',
  },
  {
    id: 7,
    title: 'SEO Strategies',
    price: '$22.00',
    category: 'Marketing',
    img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=600',
  },
  {
    id: 8,
    title: 'Machine Learning',
    price: '$50.00',
    category: 'Tech',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600',
  },
  {
    id: 9,
    title: 'Content Creation',
    price: '$27.00',
    category: 'Writing',
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600',
  },
  {
    id: 10,
    title: 'App Development',
    price: '$38.00',
    category: 'Tech',
    img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600',
  },
  {
    id: 11,
    title: 'Email Marketing',
    price: '$18.00',
    category: 'Marketing',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600',
  },
  {
    id: 12,
    title: 'Cloud Computing',
    price: '$42.00',
    category: 'Tech',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600',
  },
];

const filterTabs = [
  'All',
  'Tech',
  'Design',
  'Data Analytics',
  'Marketing',
  'Business',
  'Creative Writing',
];

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedDropdown] = useState('All Category');

  const filteredCourses = coursesData.filter((course) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Data Analytics' && course.category === 'Analytics') return true;
    if (activeTab === 'Creative Writing' && course.category === 'Writing') return true;
    return course.category.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <section className="bg-pure-white min-h-screen px-6 py-16">
      <div className="mx-auto max-w-400">
        {/* --- Header Section --- */}
        <div className="mb-10 max-w-xl">
          <h1 className="text-text-primary mb-4 text-3xl font-black tracking-tight md:text-5xl">
            Explore Our <span className="text-primary-brand font-black">Courses</span>
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed md:text-base">
            Discover a variety of subjects designed to help you build raw skills, gain real
            knowledge, and optimize your career blueprints.
          </p>
        </div>

        {/* --- Interactive Filter Tabs --- */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl border px-5 py-2.5 text-xs font-bold transition-all md:text-sm ${
                activeTab === tab
                  ? 'bg-secondary border-secondary text-white shadow-md'
                  : 'bg-section-slate border-subtle text-text-secondary hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- Category Subbar/Dropdown Selector --- */}
        <div className="border-subtle mb-10 flex items-center justify-between border-b pb-6">
          <div className="relative">
            <button className="border-subtle bg-section-slate text-text-secondary flex items-center gap-2 rounded-xl border px-5 py-3 text-xs font-bold transition-colors hover:bg-slate-100 md:text-sm">
              <span>{selectedDropdown}</span>
              <ChevronDown size={16} className="text-text-placeholder" />
            </button>
          </div>
        </div>

        {/* --- Course Cards Grid (Pixel Perfect Rounded Layout) --- */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-pure-white flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Frame with your Custom Specific Rounded Corners */}
              <div className="bg-section-slate relative aspect-4/3 w-full overflow-hidden rounded-t-[2.5rem] rounded-br-[2.5rem] rounded-bl-[6rem] shadow-sm">
                <Image
                  src={course.img}
                  alt={course.title}
                  fill
                  sizes="(max-w-768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title & Pricing Block */}
              <div className="flex items-center justify-between px-1 pt-5 pb-2">
                <h3 className="text-text-primary group-hover:text-primary-brand text-base font-black tracking-tight transition-colors md:text-lg">
                  {course.title}
                </h3>
                {/* Image এ UI/UX Design এর মত স্পেশাল কালার ট্র্যাকিং */}
                <span
                  className={`text-base font-black tracking-tight md:text-lg ${
                    course.active ? 'text-secondary' : 'text-text-primary'
                  }`}
                >
                  {course.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* --- Bottom Pagination Subbar (Pixel Perfect Alignment) --- */}
        <div className="border-subtle text-text-secondary mt-16 flex items-center justify-between border-t pt-8 text-xs font-bold md:text-sm">
          {/* Left Arrow indicators */}
          <button className="hover:text-primary-brand flex items-center gap-1 transition-colors">
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          {/* Number Track */}
          <div className="flex items-center gap-2">
            <button className="bg-yellow-accent text-secondary flex h-8 w-8 items-center justify-center rounded-full font-black">
              1
            </button>
            <button className="hover:bg-section-slate flex h-8 w-8 items-center justify-center rounded-full transition-colors">
              2
            </button>
            <button className="hover:bg-section-slate flex h-8 w-8 items-center justify-center rounded-full transition-colors">
              3
            </button>
            <span className="text-text-placeholder px-1">...</span>
            <button className="hover:bg-section-slate flex h-8 w-8 items-center justify-center rounded-full transition-colors">
              10
            </button>
          </div>

          {/* Right Arrow indicators */}
          <button className="hover:text-primary-brand flex items-center gap-1 transition-colors">
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesPage;
