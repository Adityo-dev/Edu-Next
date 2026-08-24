import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { Award, Coins, Globe, Video } from 'lucide-react';
import Image from 'next/image';

const BecomeInstructorSection = () => {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-400 px-4">
        {/* Dark Container */}
        <div className="flex flex-col justify-between gap-12 overflow-hidden rounded-md bg-slate-900 px-8 py-8 shadow-2xl lg:flex-row lg:items-center lg:gap-16">
          {/* Left: Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Teach what you love. <br />
              Earn on your terms.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
              EduNext is an open marketplace. Publish your courses, share your expertise with eager
              learners, and earn a steady commission for every enrollment.
            </p>

            {/* 2x2 Feature Grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20">
                  <Video size={16} className="text-teal-400" />
                </div>
                <span className="text-sm font-medium text-slate-200">Create your course</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20">
                  <Globe size={16} className="text-amber-400" />
                </div>
                <span className="text-sm font-medium text-slate-200">Reach thousands</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20">
                  <Coins size={16} className="text-teal-400" />
                </div>
                <span className="text-sm font-medium text-slate-200">Earn commissions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20">
                  <Award size={16} className="text-amber-400" />
                </div>
                <span className="text-sm font-medium text-slate-200">Build your brand</span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <DynamicActionButton label="Start Teaching Today" href="/register?role=instructor" />
              <p className="mt-3 text-xs text-slate-400">Join 500+ independent instructors</p>
            </div>
          </div>

          {/* Right: Image Collage */}
          <div className="w-full lg:w-1/2">
            <div className="grid h-[350px] w-full grid-cols-12 grid-rows-6 gap-3 sm:h-[450px] lg:h-[400px]">
              {/* Left Tall Image */}
              <div className="relative col-span-5 row-span-6 overflow-hidden rounded-2xl bg-blue-100">
                <Image
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80"
                  alt="Instructor teaching"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right Top Image */}
              <div className="relative col-span-7 row-span-4 overflow-hidden rounded-2xl bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
                  alt="Students learning"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right Bottom Image */}
              <div className="relative col-span-7 row-span-2 overflow-hidden rounded-2xl bg-purple-200">
                <Image
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"
                  alt="Technology"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructorSection;
