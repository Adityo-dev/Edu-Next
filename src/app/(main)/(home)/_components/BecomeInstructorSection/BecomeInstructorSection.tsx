import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { Award, Coins, Globe, Video } from 'lucide-react';
import Image from 'next/image';

const BecomeInstructorSection = () => {
  return (
    <section className="mx-auto max-w-400 px-4 py-12">
      {/* Light Gradient Container */}
      <div
        className="flex flex-col justify-between gap-12 overflow-hidden rounded-md border border-slate-100 p-6 lg:flex-row lg:items-center lg:gap-16"
        style={{ background: 'linear-gradient(160deg, #fdf9f0 0%, #f5f8f5 50%, #eef5f0 100%)' }}
      >
        {/* Left: Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Teach what you love. <br />
            Earn on your terms.
          </h2>

          <p className="text-text-secondary mt-3 max-w-2xl text-base leading-relaxed">
            EduNext is an open marketplace. Publish your courses, share your expertise with eager
            learners, and earn a steady commission for every enrollment.
          </p>

          {/* 2x2 Feature Grid */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="border-primary/20 bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full border">
                <Video size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium">Create your course</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="border-secondary/20 bg-secondary/10 flex h-8 w-8 items-center justify-center rounded-full border">
                <Globe size={16} className="text-secondary" />
              </div>
              <span className="text-sm font-medium">Reach thousands</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="border-primary/20 bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full border">
                <Coins size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium">Earn commissions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="border-secondary/20 bg-secondary/10 flex h-8 w-8 items-center justify-center rounded-full border">
                <Award size={16} className="text-secondary" />
              </div>
              <span className="text-sm font-medium">Build your brand</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <DynamicActionButton label="Start Teaching Today" href="/register?role=instructor" />
            <p className="text-text-secondary mt-3 text-xs">Join 500+ independent instructors</p>
          </div>
        </div>

        {/* Right: Image Collage */}
        <div className="w-full lg:w-1/2">
          <div className="grid h-87.5 w-full grid-cols-12 grid-rows-6 gap-3 sm:h-112.5 lg:h-100">
            {/* Left Tall Image */}
            <div className="relative col-span-5 row-span-6 overflow-hidden rounded-md bg-blue-50">
              <Image
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80"
                alt="Instructor teaching"
                fill
                quality={60}
                className="object-cover"
              />
            </div>

            {/* Right Top Image */}
            <div className="relative col-span-7 row-span-4 overflow-hidden rounded-md bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
                alt="Students learning"
                fill
                quality={60}
                className="object-cover"
              />
            </div>

            {/* Right Bottom Image */}
            <div className="relative col-span-7 row-span-2 overflow-hidden rounded-md bg-purple-50">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"
                alt="Technology"
                fill
                quality={60}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructorSection;
