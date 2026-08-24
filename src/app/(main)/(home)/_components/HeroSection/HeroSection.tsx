'use client';

import { useEffect, useRef, useState } from 'react';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { ArrowRight, Plus, Star } from 'lucide-react';
import Image from 'next/image';

/* ── Image strip data ── */
const stripImages = [
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
    alt: 'Students collaborating',
    height: 180,
    marginTop: 32,
    rotate: '-2.5deg',
  },
  {
    src: '/heroImage2.jpg',
    alt: 'Instructor teaching',
    height: 230,
    marginTop: 0,
    rotate: '1.5deg',
  },
  {
    src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&q=80',
    alt: 'Online course',
    height: 205,
    marginTop: 16,
    rotate: '-1deg',
  },
  { src: '/heroImage4.jpg', alt: 'EduNext student', height: 220, marginTop: 10, rotate: '2deg' },
  {
    src: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80',
    alt: 'Learning skills',
    height: 190,
    marginTop: 24,
    rotate: '-1.5deg',
  },
  { src: '/heroImage1.jpg', alt: 'Certificate course', height: 225, marginTop: 0, rotate: '1deg' },
  {
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80',
    alt: 'Tech skills',
    height: 180,
    marginTop: 40,
    rotate: '-2deg',
  },
];

const AnimatedStat = ({
  endValue,
  suffix,
  label,
}: {
  endValue: number;
  suffix: string;
  label: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000; // 2 seconds animation
          const increment = endValue / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= endValue) {
              setCount(endValue);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
          observer.disconnect(); // Run only once
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [endValue]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-lg leading-none font-semibold text-slate-900">
        {count}
        {suffix}
      </p>
      <p className="text-text-secondary mt-0.5 text-xs">{label}</p>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[95vh] w-full overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16"
      style={{ background: 'linear-gradient(160deg, #fdf9f0 0%, #f5f8f5 50%, #eef5f0 100%)' }}
    >
      {/* ── Subtle dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(#34796f 1.5px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Top content block ── */}
      <div className="relative z-10 mx-auto max-w-400 px-6 pt-10 pb-0 text-center md:pt-12">
        {/* Eyebrow pill */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 shadow-xs">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
          <span className="text-sm font-semibold text-amber-700">
            Join 12,000+ students learning today
          </span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-[2.4rem] leading-[1.08] font-bold tracking-tight text-slate-900 md:text-5xl lg:text-[3.5rem]">
          Master Skills That <span className="text-primary">Open Doors</span> to Your Future.
        </h1>

        {/* Description */}
        <p className="text-text-secondary mx-auto mt-5 max-w-xl text-base leading-relaxed md:text-lg">
          Expert-led courses, live Zoom sessions & verifiable PDF certificates — learn at your own
          pace from anywhere in Bangladesh.
        </p>

        {/* Decorative handwritten annotation — right side */}
        <div className="pointer-events-none absolute top-24 right-[10%] hidden rotate-6 lg:block">
          <svg width="130" height="60" viewBox="0 0 130 60" fill="none">
            <path
              d="M10 15 Q40 5 80 20 Q110 30 120 50"
              stroke="#34796f"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M108 42 L120 50 L112 56"
              stroke="#34796f"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.5"
            />
          </svg>
          <p
            className="text-primary/60 absolute -top-4 left-0 -rotate-6 text-sm font-medium"
            style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
          >
            Elevate your career
          </p>
        </div>

        {/* Decorative handwritten annotation — left side (bottom) */}
        <div className="pointer-events-none absolute bottom-8 left-[8%] hidden -rotate-3 lg:block">
          <p
            className="text-primary/60 mb-1 text-sm font-medium"
            style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
          >
            It&apos;s free to start
          </p>
          <svg width="80" height="30" viewBox="0 0 80 30" fill="none">
            <path
              d="M5 5 Q30 2 65 20"
              stroke="#34796f"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M55 14 L65 20 L58 26"
              stroke="#34796f"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>

      {/* ── Photo Strip ── */}
      <div className="relative z-10 mt-8 w-full overflow-hidden">
        {/* Left fade mask */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 md:w-40"
          style={{ background: 'linear-gradient(to right, #fdf9f0, transparent)' }}
        />
        {/* Right fade mask */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 md:w-40"
          style={{ background: 'linear-gradient(to left, #eef5f0, transparent)' }}
        />
        {/* Marquee wrapper — hover pauses scroll */}
        <div className="group">
          {/* Duplicate images for seamless loop */}
          <div className="flex w-max" style={{ animation: 'marqueeScroll 35s linear infinite' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4">
                {stripImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative shrink-0 overflow-hidden rounded-2xl shadow-lg"
                    style={{
                      width: '160px',
                      height: `${img.height}px`,
                      marginTop: `${img.marginTop}px`,
                      transform: `rotate(${img.rotate})`,
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="160px"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10 ring-inset" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>{' '}
        {/* end .group */}
      </div>

      {/* ── CTA + Social proof ── */}
      <div className="relative z-10 mx-auto max-w-400 px-6 pt-8 pb-10 text-center">
        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-3">
          <DynamicActionButton
            label="Explore Courses"
            href="/courses"
            variant="default"
            icon={ArrowRight}
            showIcon
          />
          <DynamicActionButton label="Get Started Free" href="/register" variant="outline" />
        </div>

        {/* Social proof row */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-5">
          {/* Avatars */}
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm"
              >
                <Image
                  src={`https://i.pravatar.cc/80?img=${i + 10}`}
                  width={40}
                  height={40}
                  alt="Student"
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white shadow-sm">
              <Plus size={16} />
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />
              ))}
              <span className="ml-1.5 text-sm font-extrabold text-slate-800">4.9</span>
            </div>
            <p className="text-text-secondary text-xs">Trusted by 5,000+ students</p>
          </div>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* Quick stats */}
          <AnimatedStat endValue={120} suffix="+" label="Courses" />
          <AnimatedStat endValue={50} suffix="+" label="Instructors" />
          <AnimatedStat endValue={12} suffix="K+" label="Students" />
        </div>
      </div>

      {/* ── Marquee keyframe + pause-on-hover ── */}
      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .group:hover > div {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
