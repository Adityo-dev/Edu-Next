'use client';

import { Plus, Star } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative flex h-full w-full items-center overflow-hidden py-35">
      {/* --- Modern Professional Background Logic --- */}
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
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <div className="relative inline-block">
              <h1 className="text-5xl leading-tight font-bold tracking-tight md:text-7xl">
                Empowering You <br />
                with <span>Digital </span>
                <span className="text-secondary italic">Skills</span>
              </h1>
              {/* Yellow Spark Icon */}
              <div className="absolute -top-4 -right-6 animate-pulse">
                <svg width="45" height="45" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M20 0L23.5 16.5L40 20L23.5 23.5L20 40L16.5 23.5L0 20L16.5 16.5L20 0Z"
                    fill="#e96600"
                  />
                </svg>
              </div>
            </div>

            <p className="text-text-secondary mt-6 max-w-lg text-lg leading-relaxed">
              EduNext brings you verified instructors, live sessions, and certificates — so you can
              learn at your own pace and unlock new career opportunities.
            </p>

            <div className="mt-10">
              <button className="bg-primary text-pure-white cursor-pointer rounded-sm px-10 py-4 font-bold shadow-2xl shadow-emerald-200 transition-all hover:bg-[#2a6159] active:scale-95">
                Explore Courses
              </button>
            </div>

            {/* Avatar Group */}
            <div className="mt-13 flex flex-wrap items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm"
                  >
                    <Image
                      src={`https://i.pravatar.cc/150?u=${i + 10}`}
                      width={100}
                      height={100}
                      alt="User"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#2D3134] text-white shadow-sm">
                  <Plus size={20} />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((s) => (
                    <Star key={s} size={18} fill="#ffc107" color="#ffc107" />
                  ))}
                  <Star size={18} fill="none" color="#ffc107" strokeWidth={2} />
                  <span className="text-text-primary ml-2 font-semibold">(4.5)</span>
                </div>
                <p className="text-text-secondary mt-1 text-sm">5,000+ Students trust EduNext</p>
              </div>
            </div>
          </div>

          {/* Right Content (Image Section) */}
          <div className="relative flex w-full justify-end lg:w-1/2">
            <div className="relative w-full max-w-150">
              {/* Main Image Wrapper */}
              <div className="relative z-10 overflow-hidden rounded-t-[50px] rounded-br-[50px] rounded-bl-[160px] border-8 border-white shadow-sm shadow-slate-200">
                <Image
                  src="/heroImage4.jpg"
                  alt="Student"
                  width={600}
                  height={400}
                  priority
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* Badge */}
              <div className="absolute -bottom-6 -left-6 z-20 rounded-full border-[6px] border-white bg-white p-1 shadow-2xl">
                <div className="relative flex h-30 w-30 items-center justify-center">
                  <svg
                    className="absolute inset-0 h-full w-full animate-[spin_12s_linear_infinite]"
                    viewBox="0 0 100 100"
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text className="fill-slate-800 text-[9px] font-black tracking-[0.15em] uppercase">
                      <textPath xlinkHref="#circlePath">
                        • EduNext • Learn Online • Grow Fast
                      </textPath>
                    </text>
                  </svg>
                  <div className="text-secondary z-30">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
