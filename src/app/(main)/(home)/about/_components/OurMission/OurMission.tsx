'use client';

import { Check } from 'lucide-react';
import Image from 'next/image';

const missionPoints = [
  'Flexible Learning Schedule',
  'Expert-Led Video Courses',
  'Pro-Workflows and Exercises',
  'Continuous Industry Updates',
  'Effortlessly Organized Classrooms',
];

const OurMission = () => {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12">
      <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-center">
        {/* Left Side: Main Image */}
        <div className="flex w-full justify-center lg:w-1/2 lg:justify-start">
          <div className="bg-pure-white relative aspect-[4/3] w-full max-w-[550px] overflow-hidden rounded-[2.5rem] shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800"
              alt="Our Mission Student"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side: Content & Points */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-text-primary mb-6 text-3xl font-black tracking-tight md:text-5xl">
            Our <span className="text-secondary">Mission</span>
          </h2>

          <p className="text-text-secondary mb-8 max-w-xl text-base leading-relaxed">
            Our mission is to provide high-quality, accessible education that empowers individuals
            globally. We are committed to fostering personal development, driving positive outcomes,
            and enabling continuous career success.
          </p>

          {/* Checklist Grid */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {missionPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-yellow-accent text-secondary flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                  <Check size={12} strokeWidth={4} />
                </div>
                <span className="text-text-primary text-sm font-semibold">{point}</span>
              </div>
            ))}
          </div>

          <button className="bg-primary-brand rounded-xl px-8 py-3.5 font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-95">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
