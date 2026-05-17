'use client';

import { BookOpen, Clock, GraduationCap, Star } from 'lucide-react';
import Image from 'next/image';

const CourseDetailsHero = () => {
  return (
    <div className="relative flex h-full w-full items-center overflow-hidden py-20">
      <div className="absolute inset-0 z-0">
        {/* 1. Subtle Dot Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(#34796f 1.5px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-400 px-6">
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
          {/* Left Side: Info */}
          <div className="w-full lg:w-1/2">
            {/* Ratings */}
            <div className="mb-6 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={18} fill="#ffc107" color="#ffc107" />
                ))}
              </div>
              <span className="text-text-primary text-sm font-semibold">(25 Review)</span>
              <span className="text-text-secondary text-sm font-semibold">
                | 450+ Student Enroll
              </span>
            </div>

            {/* Dynamic Badges */}
            <div className="text-text-secondary mb-6 flex flex-wrap items-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-secondary" />
                <span>40 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-secondary" />
                <span>Lesson 15 (Online)</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={20} className="text-secondary" />
                <span>05 Award</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight md:text-6xl">
              UI/UX <span className="text-secondary">Design</span>
            </h1>

            <p className="text-text-secondary max-w-lg text-lg leading-relaxed">
              Learn computer utility, UX basics, user research, wireframe, and professional
              prototype design from high-class industry expert.
            </p>

            {/* Action Area */}
            <div className="mt-10 flex max-w-md items-center justify-between gap-4">
              <button className="bg-primary text-pure-white cursor-pointer rounded-sm px-10 py-4 font-bold shadow-2xl shadow-emerald-200 transition-all hover:bg-[#2a6159] active:scale-95">
                Enroll Now
              </button>
              <span className="text-primary text-4xl font-black">$32.00</span>
            </div>
          </div>

          {/* Right Side: Image with Badge */}
          <div className="relative flex w-full justify-center lg:w-1/2">
            <div className="relative w-full max-w-150">
              {/* Image Frame */}
              <div className="overflow-hidden rounded-t-[3rem] rounded-br-[3rem] rounded-bl-[8rem] border-[6px] border-white shadow-xl shadow-slate-100">
                <Image
                  src="/image1.jpg"
                  alt="UI/UX Course"
                  width={600}
                  height={450}
                  className="aspect-4/3 w-full object-cover"
                />
              </div>

              {/* Rotating Badge */}
              <div className="absolute -bottom-6 -left-6 z-20 rounded-full border-4 border-white bg-white p-1 shadow-xl">
                <div className="relative flex h-24 w-24 items-center justify-center">
                  <svg
                    className="absolute inset-0 h-full w-full animate-[spin_15s_linear_infinite]"
                    viewBox="0 0 100 100"
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                      />
                    </defs>
                    <text className="fill-slate-800 text-[10px] font-black tracking-widest uppercase">
                      <textPath xlinkHref="#circlePath">• LEARN • EXPERT • UIUX</textPath>
                    </text>
                  </svg>
                  <div className="text-secondary z-30 text-xl font-bold">★</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsHero;
