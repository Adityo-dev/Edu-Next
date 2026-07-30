'use client';

import { Award, Globe, Layout, Users } from 'lucide-react';
import Image from 'next/image';

const visionFeatures = [
  {
    icon: <Users size={20} className="text-secondary" />,
    bg: 'bg-yellow-accent',
    title: 'Global Community',
    desc: 'Connecting thousands of learners worldwide.',
  },
  {
    icon: <Layout size={20} className="text-primary-brand" />,
    bg: 'bg-teal-accent',
    title: 'Pro Layouts',
    desc: 'Structured and highly optimized curriculum blueprints.',
  },
  {
    icon: <Award size={20} className="text-purple-500" />,
    bg: 'bg-purple-50',
    title: 'Expert Teachers',
    desc: 'Learn directly from certified industry masterminds.',
  },
  {
    icon: <Globe size={20} className="text-blue-500" />,
    bg: 'bg-blue-50',
    title: 'Global Scalability',
    desc: 'Delivering micro-lessons for interactive progress.',
  },
];

const OurVision = () => {
  return (
    <div className="mx-auto mb-16 max-w-[1600px] px-6 py-12">
      <div className="flex flex-col-reverse justify-between gap-12 lg:flex-row lg:items-center">
        {/* Left Side: Content & Feature Grid */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-text-primary mb-6 text-3xl font-black tracking-tight md:text-5xl">
            Our <span className="text-secondary">Vision</span>
          </h2>

          <p className="text-text-secondary mb-8 max-w-xl text-base leading-relaxed">
            Our vision is to build the ultimate digital ecosystems where technology meets tailored
            training models, shaping the path for future professionals and pioneering platforms
            globally.
          </p>

          {/* Features Layout Map */}
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {visionFeatures.map((feat, index) => (
              <div key={index} className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${feat.bg}`}
                >
                  {feat.icon}
                </div>
                <div>
                  <h4 className="text-text-primary mb-1 text-sm font-bold">{feat.title}</h4>
                  <p className="text-text-secondary max-w-[200px] text-xs leading-normal">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="bg-primary-brand rounded-xl px-8 py-3.5 font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-95">
            Explore Sector
          </button>
        </div>

        {/* Right Side: Main Image */}
        <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
          <div className="bg-pure-white relative aspect-[4/3] w-full max-w-[550px] overflow-hidden rounded-[2.5rem] shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800"
              alt="Our Vision Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
