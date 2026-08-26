'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { ArrowRight } from 'lucide-react';
import PhotoMarquee from './_components/PhotoMarquee/PhotoMarquee';
import SocialProof from './_components/SocialProof/SocialProof';

const HeroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden pt-16 pb-8 md:pt-24 md:pb-12 lg:pt-28 lg:pb-16"
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
          <span className="text-secondary text-sm font-semibold">
            Join 12,000+ students learning today
          </span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-[2.4rem] leading-[1.08] font-bold tracking-tight md:text-5xl lg:text-[3.5rem]">
          Master Skills That <span className="text-primary">Open Doors</span> to Your Future.
        </h1>

        {/* Description */}
        <p className="text-text-secondary mx-auto mt-5 max-w-xl text-base leading-relaxed md:text-lg">
          Transform your potential into expertise with industry-curated courses, interactive live
          sessions, and verifiable credentials. Learn from top professionals at your own pace.
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
      <PhotoMarquee />

      <div className="relative z-10 mx-auto max-w-400 px-6 pt-8 pb-4 text-center md:pb-8">
        <div className="flex items-center justify-center gap-3">
          <DynamicActionButton
            label="Explore Courses"
            href="/courses"
            variant="default"
            showIcon
            icon={ArrowRight}
            iconPosition="right"
          />
          <DynamicActionButton label="Get Started Free" href="/register" variant="outline" />
        </div>

        {/* Social proof row */}
        <SocialProof />
      </div>
    </section>
  );
};

export default HeroSection;
